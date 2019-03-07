import console = require("console")
import { createServer } from "net"
import serverRequestHandler from "./handler"

const initiateTcp = async (port: number, app: any) => {
  return new Promise((resolve) => {
    const server = createServer()
    server.on("connection", (sock) => {
          // We have a connection - a socket object is assigned to the connection automatically
      console.log("TCP Connection from " + sock.remoteAddress + ":" + sock.remotePort)

      // Add a 'data' event handler to this instance of socket
      sock.on("data", async (data: any) => {
          const result = await serverRequestHandler(data, app)
          // Write the data back to the socket, the client will receive it as data from the server
          sock.write(JSON.stringify(result))

      })

      // Add a 'close' event handler to this instance of socket
      sock.on("close", function(data: any) {
          console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort)
      })

    })
    server.listen(port, "localhost", undefined, () => resolve(server))
  })
}

export default initiateTcp
