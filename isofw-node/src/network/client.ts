
import console = require("console")
import { dataOptions, IUiClient } from "isofw-shared/src/util/xpfwdata"
import { get, isString } from "lodash"
import { Socket } from "net"
import clientMessageHandler from "./clientHandler"

const parseJwt = (token: any) => {
  const base64Url = token.split(".")[1]
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
  return JSON.parse(window.atob(base64))
}

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
    TCPClient.client.write(JSON.stringify({
      collection, method, data, trackId, currentToken
    }))
  })
}

const TCPClient: IUiClient = {
  client: null,
  connectTo: (url: any, options: any) => {
    return new Promise((resolve) => {
      TCPClient.client = new Socket()
      TCPClient.client.connect(options.port, url)

      TCPClient.client.on("connect", () => {
        console.log("CLIENT CONNECTED")
        resolve()
        if (get(options, "userStore")) {
          const store = get(options, "userStore")
          store.setConnected(true)
        }
      })
      TCPClient.client.on("data", (data: any) => {
        clientMessageHandler(data, promises, options)
      })

      TCPClient.client.on("close", () => {
        if (get(options, "userStore")) {
          const store = get(options, "userStore")
          store.setConnected(false)
        }
      })
      if (get(options, "userStore")) {
        //
      }
      if (get(options, "makeAuth")) {
        // return app.authenticate()
      }
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
    const parsedData = parseJwt(loginRes.accessToken)
    currentToken = loginRes.accessToken
    const user = await TCPClient.get(dataOptions.userCollection, get(parsedData, "userId"))
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

export default TCPClient