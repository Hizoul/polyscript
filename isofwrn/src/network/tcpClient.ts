import { Buffer } from "buffer"
import val from "isofw-shared/src/globals/val"
import { packMessage } from "isofw-shared/src/network/compression"
import parseJwt from "isofw-shared/src/util/parseJwt"
import { AuthForm, dataOptions, IUiClient, UserStore } from "isofw-shared/src/util/xpfwdata"
import { FormStore } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import { Socket } from "net"
import clientMessageHandler from "./clientHandler"

let trackId = 0
export interface IResolver {
  resolve: Function, reject: Function
}
const promises: {[index: number]: IResolver | undefined} = {}
const makeCall = (collection: string, method: string, data: any[]) => {
  return new Promise((resolve, reject) => {
    trackId++
    if (trackId > 999999999) {
      trackId = 1
    }
    promises[trackId] = {resolve, reject}
    TCPClient.client.write(packMessage(JSON.stringify({
      collection, method, data, trackId
    })) + val.network.packetDelimiter)
  })
}
const accessTokenSaveKey = "accessToken"
const TCPClient: IUiClient & {giveOriginal?: boolean, storage?: any} = {
  client: null,
  giveOriginal: false,
  storage: null,
  connectTo: (url: any, options: any) => {
    return new Promise((resolve) => {
      TCPClient.storage = get(options, "authOptions.storage")
      TCPClient.client = new Socket()
      TCPClient.client.connect(options.port, url)

      TCPClient.client.on("connect", () => {
        console.log("CLIENT CONNECTED")
        resolve()
        if (get(options, "userStore")) {
          const store = get(options, "userStore")
          store.setConnected(true)
        }
        if (TCPClient.storage) {
          TCPClient.storage.getItem(accessTokenSaveKey, (error: any, accessToken: any) => {
            if (accessToken != null && accessToken.length > 0) {
              FormStore.setValue(String(AuthForm.title), {accessToken, strategy: "jwt"})
              UserStore.login()
            }
          })
        }
      })
      TCPClient.client.on("data", (data: any) => {
        clientMessageHandler(data, promises, options, TCPClient.giveOriginal)
      })

      TCPClient.client.on("close", () => {
        if (get(options, "userStore")) {
          const store = get(options, "userStore")
          store.setConnected(false)
        }
      })
    })
  },
  disconnect: () => {
    const oldClient = TCPClient.client
    if (oldClient != null) {
      oldClient.destroy()
    }
    TCPClient.client = null
  },
  login: async (loginData: any) => {
    const loginRes: any = await makeCall("authentication", "create", [loginData])
    let accessToken = TCPClient.giveOriginal === true ? loginRes.result.accessToken : loginRes.accessToken
    if (TCPClient.storage && loginData.strategy !== "jwt") {
      TCPClient.storage.setItem(accessTokenSaveKey, accessToken)
    } else {
      accessToken = loginData.accessToken
    }
    const parsedData = parseJwt(accessToken)
    const user = await TCPClient.get(dataOptions.userCollection, get(parsedData, "userId"))
    return TCPClient.giveOriginal === true ? {
      ...loginRes,
      user,
      accessToken: loginRes.accessToken
    } : {
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

export default TCPClient
