import val from "isofw-shared/src/globals/val"
import lzString from "isofw-shared/src/util/lzString"
import pako from "isofw-shared/src/util/pako"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { createServer, Socket } from "net"
import { performance } from "perf_hooks"
import serverRequestHandler, {
  connectionAuthTokens
} from "./handler"

const methods = ["created", "patched", "removed", "updated"]
const initiateTcp = async (port: number, app: any) => {
  return new Promise((resolve) => {
    const server = createServer()
    const activeSockets: Socket[] = []
    const pushEvent = (collection: string, method: string) => {
      return (result: any) => {
        for (const socket of activeSockets) {
          socket.write(JSON.stringify({result, trackId: -1, collection, method}) + val.network.packetDelimiter)
        }
      }
    }
    for (const collection of collections) {
      for (const method of methods) {
        app.service(collection).on(method, pushEvent(collection, method))
      }
    }
    server.on("connection", (sock) => {
      console.log("GOT CONNECTION", sock.remoteAddress, sock.remotePort)
      activeSockets.push(sock)
      const socketKey = `${sock.remoteAddress}:${sock.remotePort}`
      sock.on("data", (data: any) => {
        serverRequestHandler(data, app, socketKey, (result: any, timeStuff: any) => {
          if (val.network.addServerTimeInfo) {
            const end = performance.now()
            result.sent = Date.now()
            result.pend = end - timeStuff.start
            result.start = timeStuff.start
            result.end = end
            result.arrive = timeStuff.startAt
          }
          let toSend = JSON.stringify(result)
          if (val.network.useCompression) {
            if (val.network.useGzipCompression) {
              toSend = pako.gzip(toSend, {to: "string"})
            } else {
              toSend = lzString.compressToBase64(toSend)
            }
          }
          sock.write(toSend + val.network.packetDelimiter)
        }, () => {
          let start: any, startAt: any
          if (val.network.addServerTimeInfo) {
            startAt = Date.now()
            start = performance.now()
          }
          return {startAt, start}
        })
      })
      sock.on("close", function(data: any) {
          console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort)
          const index = activeSockets.indexOf(sock)
          activeSockets.splice(index, 1)
          delete connectionAuthTokens[socketKey]
      })
    })
    server.listen(port, "0.0.0.0", undefined, () => resolve(server))
  })
}

export default initiateTcp
