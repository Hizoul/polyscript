import {decode, encode} from "base-64"
import val from "isofw-shared/src/globals/val"
import connect from "isofw-shared/src/util/backendConnection"
import { AsyncStorage } from "react-native"
import TCPClient from "./tcpClient"
import UDPClient from "./udpClient"

window.btoa = encode

window.atob = decode

connect(AsyncStorage, () => {
  if (val.network.networkToUse === val.network.tcp) {
    return TCPClient
  } else if (val.network.networkToUse === val.network.udp) {
    return UDPClient
  }
  return undefined
})
