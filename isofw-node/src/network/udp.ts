import { createSocket } from "dgram"
import serverRequestHandler from "./handler"

const initiateUdp = async (port: number, app: any) => {
  return new Promise((resolve) => {
    const server = createSocket("udp4")
    server.on("listening", () => {
      resolve(server)
      server.on("message", async (data, remote) => {
          const result = await serverRequestHandler(data, app)
          // Write the data back to the socket, the client will receive it as data from the server
          const responseData = Buffer.from(JSON.stringify(result))
          server.send(responseData, 0, responseData.length, remote.port, remote.address)

      })
      resolve()
    })
    server.bind(port)
  })
}

export default initiateUdp
