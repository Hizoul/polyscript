import { createSocket } from "dgram"
import val from "isofw-shared/src/globals/val"
import serverRequestHandler from "./handler"

const initiateUdp = async (port: number, app: any) => {
  return new Promise((resolve) => {
    const server = createSocket("udp4")
    server.on("listening", () => {
      resolve(server)
      server.on("message", async (data, remote) => {
          let start: any, end: any, startAt: any
          if (val.network.addServerTimeInfo) {
            startAt = Date.now()
            start = performance.now()
          }
          serverRequestHandler(data, app, (result: any) => {
            if (val.network.addServerTimeInfo) {
              end = performance.now()
              result.sent = Date.now()
              result.pend = end - start
              result.start = start
              result.end = end
              result.arrive = startAt
            }
            // Write the data back to the socket, the client will receive it as data from the server
            const responseData = Buffer.from(JSON.stringify(result))
            server.send(responseData, 0, responseData.length, remote.port, remote.address)
          }, () => {
            let start: any, startAt: any
            if (val.network.addServerTimeInfo) {
              startAt = Date.now()
              start = performance.now()
            }
            return {startAt, start}
          })
      })
      resolve()
    })
    server.bind(port)
  })
}

export default initiateUdp
