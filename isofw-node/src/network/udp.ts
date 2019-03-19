import console = require("console")
import { createSocket } from "dgram"
import val from "isofw-shared/src/globals/val"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { performance } from "perf_hooks"
import serverRequestHandler from "./handler"

const registered: any = {}

const packageSize = 512

const initiateUdp = async (port: number, app: any) => {
  return new Promise((resolve) => {
    const server = createSocket("udp4")
    server.on("listening", () => {
      resolve(server)
      console.log("UDP IS LISTENING")
      server.on("message", async (data, remote) => {
        const socketKey = `${remote.address}:${remote.port}`
        console.log(`handling message from ${socketKey}`, data)
        serverRequestHandler(data, app, socketKey, async (result: any, timeStuff: any) => {
          if (val.network.addServerTimeInfo) {
            const end = performance.now()
            result.sent = Date.now()
            result.pend = end - timeStuff.start
            result.start = timeStuff.start
            result.end = end
            result.arrive = timeStuff.startAt
          }
          // Write the data back to the socket, the client will receive it as data from the server
          console.log("ABOUT TO SEND BACK RESPONSE")
          const responseData = JSON.stringify(result)
          const parts = []
          for (let i = 0; i < responseData.length; i = i + packageSize) {
            parts.push(responseData.substring(i, Math.min(responseData.length, i + packageSize)))
          }
          console.log("PARTS TO SEND ARE", parts[parts.length - 1])
          for (const part of parts) {
            const toSend = Buffer.from(part)
            server.send(toSend, 0, toSend.length, remote.port, remote.address)
            await promiseTimeout(50)
          }
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
