import val from "isofw-shared/src/globals/val"
import { IUiClient } from "isofw-shared/src/util/xpfwdata"

export interface IMeasurement {
  time: number
  method: string
  collection: string
  clientSent?: number
  clientArrive?: number
  serverArrive?: number
  serverSent?: number
  serverProcessTime?: number
}

export interface IBenchmarkClient extends IUiClient {
  measurements: any[]
  measureCall: any
  persistResults: () => Promise<any>
}

const makeBenchmarkClient = (originalClient: IUiClient, networkType?: number) => {
  const oc: any = originalClient
  oc.giveOriginal = true
  const newClient: IBenchmarkClient = {
    client: null,
    measurements: [],
    persistResults: () => {
      const toSend = newClient.measurements
      newClient.measurements = []
      return originalClient.create(val.service.benchmarkResults, {
        measuredAt: new Date(),
        networkType,
        measurements: toSend
      })
    },
    measureCall: async (method: string, data: any[]) => {
      try {
      const clientSent = Date.now()
      const start = performance.now()
      const res = await oc[method](...data)
      const end = performance.now()
      const clientArrive = Date.now()
      newClient.measurements.push({
        method, collection: data[0], time: end - start,
        serverArrive: res.arrive, serverSent: res.sent,
        serverProcessTime: res.pend,
        clientSent, clientArrive
      })
      return val.network.networkToUse === val.network.websocket ? res : res.result
    } catch (e) {
      return e
    }
    },
    connectTo: async (url, options) => {
      const start = performance.now()
      await originalClient.connectTo(url, options)
      newClient.client = originalClient.client
      const end = performance.now()
      newClient.measurements.push({time: end - start, method: "connect", collection: "none"})
    },
    disconnect: () => originalClient.disconnect(),
    create: (collection: string, data: any) => newClient.measureCall("create", [collection, data]),
    find: (collection: string, data: any) => newClient.measureCall("find", [collection, data]),
    patch: (collection: string, id: any, data: any) => newClient.measureCall("patch", [collection, id, data]),
    remove: (collection: string, id: any) => newClient.measureCall("remove", [collection, id]),
    get: (collection: string, id: any) => newClient.measureCall("get", [collection, id]),
    login: (data: any) => newClient.measureCall("login", [data]),
    register: (data: any) => newClient.measureCall("register", [data]),
    logout: () => newClient.measureCall("logout", ["user"])
  }
  return newClient
}

export default makeBenchmarkClient
