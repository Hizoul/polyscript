import collections from " isofw-shared/src/xpfwDefs/collections";
import val from "isofw-shared/src/globals/val";
import { createServer, Socket } from "net"
import serverRequestHandler from "./handler"
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
      activeSockets.push(sock)
      sock.on("data", async (data: any) => {
          const result = await serverRequestHandler(data, app)
          sock.write(JSON.stringify(result) + val.network.packetDelimiter)
      })
      sock.on("close", function(data: any) {
          console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort)
          const index = activeSockets.indexOf(sock)
          activeSockets.splice(index, 1)
      })
    })
    server.listen(port, "localhost", undefined, () => resolve(server))
  })
}

export default initiateTcp