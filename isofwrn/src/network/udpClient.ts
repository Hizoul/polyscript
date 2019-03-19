import { createSocket } from "dgram"
import val from "isofw-shared/src/globals/val"
import parseJwt from "isofw-shared/src/util/parseJwt"
import { dataOptions, IUiClient } from "isofw-shared/src/util/xpfwdata"
import { get } from "lodash"
import clientMessageHandler from "./clientHandler"

let trackId = 0
export interface IResolver {
  resolve: Function, reject: Function
}
const promises: {[index: number]: IResolver | undefined} = {}
let currentToken: any
const makeCall = (collection: string, method: string, data: any[]) => {
  return new Promise((resolve, reject) => {
    trackId++
    if (trackId > 999999999) {
      trackId = 1
    }
    promises[trackId] = {resolve, reject}
    const msg = Buffer.from(JSON.stringify({
      collection, method, data, trackId, currentToken
    }) + val.network.packetDelimiter)
    UDPClient.client.send(msg, 0, msg.length, UDPClient.port, UDPClient.url)
  })
}

const UDPClient: IUiClient & {url: string, port: number, giveOriginal: boolean} = {
  url: "",
  port: -1,
  giveOriginal: false,
  client: null,
  connectTo: (url: any, options: any) => {
    return new Promise((resolve) => {
      console.log("DOING UDP CONNECT")
      UDPClient.client = createSocket("udp4")
      UDPClient.port = options.port
      UDPClient.url = url

      UDPClient.client.on("listening", () => {
        console.log("UDPCLIENT CONNECTED")
        resolve()
        if (get(options, "userStore")) {
          const store = get(options, "userStore")
          store.setConnected(true)
        }
      })
      UDPClient.client.on("message", (data: any) => {
        clientMessageHandler(data, promises, options, UDPClient.giveOriginal)
      })

      UDPClient.client.on("error", () => {
        console.log("UDP GOT ERROR")
        if (get(options, "userStore")) {
          const store = get(options, "userStore")
          store.setConnected(false)
        }
      })
      UDPClient.client.bind(0)
    })
  },
  disconnect: () => {
    return new Promise((resolve) => {
      const oldClient = UDPClient.client
      if (oldClient != null) {
        oldClient.close(resolve)
      }
      UDPClient.client = null
    })
  },
  login: async (loginData: any) => {
    const loginRes: any = await makeCall("authentication", "create", [loginData])
    const parsedData = parseJwt(UDPClient.giveOriginal === true ? loginRes.result.accessToken : loginRes.accessToken)
    currentToken = loginRes.accessToken
    const user = await UDPClient.get(dataOptions.userCollection, get(parsedData, "userId"))
    return {
      user,
      accessToken: loginRes.accessToken
    }
  },
  register: (registerData: any) => {
    return makeCall(dataOptions.userCollection, "create", [registerData])
  },
  logout: () => {
    // return FeathersClient.client.logout()
    return Promise.resolve()
  },
  get: (collection: string, id: any) => {
    return makeCall(collection, "get", [id])
  },
  remove: (collection: string, id: any) => {
    return makeCall(collection, "remove", [id])
  },
  create: (collection: string, createData: any) => {
    return makeCall(collection, "create", [createData])
  },
  find: (collection: string, queryObj: any) => {
    return makeCall(collection, "find", [{query: queryObj}])
  },
  patch: (collection: string, id: any, createData: any) => {
    return makeCall(collection, "patch", [id, createData])
  }
}

export default UDPClient
