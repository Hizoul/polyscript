import console = require("console")
import { createServer } from "net"
import serverRequestHandler from "./handler"

const initiateTcp = async (port: number, app: any) => {
  return new Promise((resolve) => {
    const server = createServer()
    server.on("connection", (sock) => {
      sock.on("data", async (data: any) => {
          const result = await serverRequestHandler(data, app)
          sock.write(JSON.stringify(result))
      })
      // sock.on("close", function(data: any) {
      //     console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort)
      // })
    })
    server.listen(port, "localhost", undefined, () => resolve(server))
  })
}

export default initiateTcp
