import { createServer } from "net"

const initiateTcp = async (port: number) => {
  return new Promise((resolve) => {
    const server = createServer()
    server.on("connected", (sock) => {
          // We have a connection - a socket object is assigned to the connection automatically
      console.log("CONNECTED: " + sock.remoteAddress + ":" + sock.remotePort)

      // Add a 'data' event handler to this instance of socket
      sock.on("data", function(data: any) {

          console.log("DATA " + sock.remoteAddress + ": " + data)
          // Write the data back to the socket, the client will receive it as data from the server
          sock.write('You said "' + data + '"')

      })

      // Add a 'close' event handler to this instance of socket
      sock.on("close", function(data: any) {
          console.log("CLOSED: " + sock.remoteAddress + " " + sock.remotePort)
      })

    })
    server.listen(port, undefined, undefined, resolve)
  })
}

export default initiateTcp
