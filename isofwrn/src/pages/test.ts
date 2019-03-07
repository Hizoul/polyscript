
// OR, if not shimming via package.json "browser" field:
// var dgram = require('react-native-udp')
import { createSocket } from "dgram"

const socket = createSocket("udp4")
socket.bind(12345)
socket.once("listening", function() {
  console.warn("LISTENING UDP")
})

socket.on("message", (msg, rinfo) => {
  console.warn("message was received", msg)
  const buf = Buffer.from("MYSTRING")
  socket.send(buf, 0, buf.length, rinfo.port, rinfo.address, (err) => {
    console.warn("message was sent", err)
  })
})
