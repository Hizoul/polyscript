import console = require("console");
import { createSocket } from "dgram"

const initiateUdp = async (port: number) => {
  return new Promise((resolve) => {
    const server = createSocket("udp4")
    server.on("listening", () => {
          // We have a connection - a socket object is assigned to the connection automatically
      console.log("UDP LIstening: ")

      // Add a 'data' event handler to this instance of socket
      server.on("message", (data, remote) => {

          console.log("DATA " + remote.address + ": ", data)
          // Write the data back to the socket, the client will receive it as data from the server
          const responseData = "serverresponse"
          server.send(responseData, remote.port, remote.address, (e, b) => {
            console.log("SEND CALLBACK", e, b)
          })

      })
      resolve()
    })
    server.bind(port, undefined)
  })
}

export default initiateUdp
