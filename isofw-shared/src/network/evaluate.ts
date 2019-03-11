import { get } from "lodash"

const evaluateMeasurements = async (measurements: any[]) => {
  const result: any = {}
  for (const measurement of measurements) {
    const user = get(measurement, "measurements[0].userId")
    const networkType = get(measurement, "networkType")
    if (result[user] == null) {
      result[user] = {}
    }
    if (result[user][networkType] == null) {
      result[user][networkType] = {
        totalBytes: 0, total: 0,
        totalClientBytes: 0, totalServerBytes: 0,
        totalProcessTime: 0, totalServerTime: 0, totalClientTime: 0,
        totalClientToServer: 0, totalServerToClient: 0,
        fastestClientToServer: 999, slowestClientToServer: 0,
        fastestServerToClient: 999, slowestServerToClient: 0,
        fastestRoundtrip: 999, slowestRoundTrip: 0,
        clientToServer: [], serverToClient: [], roundTrip: []
      }
    }
    for (const measure of get(measurement, "measurements", [])) {
      const clientToServer = measure.serverArrive - measure.clientSent
      const serverToClient = measure.clientArrive - measure.serverSent
      result[user][networkType].clientToServer.push(clientToServer)
      result[user][networkType].serverToClient.push(serverToClient)
      result[user][networkType].roundTrip.push(measure.clientProcessTime)
      result[user][networkType].total++
      result[user][networkType].totalBytes += measure.clientMsgSize
      result[user][networkType].totalBytes += measure.serverMsgSize
      result[user][networkType].totalClientBytes += measure.clientMsgSize
      result[user][networkType].totalServerBytes += measure.serverMsgSize
      result[user][networkType].totalProcessTime += measure.clientProcessTime
      result[user][networkType].totalServerTime += measure.serverProcessTime
      result[user][networkType].totalClientTime += measure.clientProcessTime - measure.serverProcessTime
      result[user][networkType].totalClientToServer += clientToServer
      result[user][networkType].totalServerToClient += serverToClient
      if (result[user][networkType].fastestRoundTrip > measure.clientProcessTime) {
        result[user][networkType].fastestRoundTrip = measure.clientProcessTime
      }
      if (result[user][networkType].slowestRoundTrip < measure.clientProcessTime) {
        result[user][networkType].slowestRoundTrip = measure.clientProcessTime
      }
      if (result[user][networkType].fastestClientToServer > clientToServer) {
        result[user][networkType].fastestClientToServer = clientToServer
      }
      if (result[user][networkType].slowestClientToServer < clientToServer) {
        result[user][networkType].slowestClientToServer = clientToServer
      }
      if (result[user][networkType].fastestServerToClient > serverToClient) {
        result[user][networkType].fastestServerToClient = serverToClient
      }
      if (result[user][networkType].slowestServerToClient < serverToClient) {
        result[user][networkType].slowestServerToClient = serverToClient
      }
    }
  }
  const finalResult: any = {}
  for (const user of Object.keys(result)) {
    finalResult[user] = {}
    for (const networkType of Object.keys(result[user])) {
      const r = result[user][networkType]
      finalResult[user][networkType] = {
        ...r,
        avgBytes: r.totalBytes / r.total,
        avgClientBytes: r.totalClientBytes / r.total,
        avgServerBytes: r.totalServerBytes / r.total,
        avgProcessTime: r.totalProcessTime / r.total,
        avgServerTime: r.totalServerTime / r.total,
        avgClientTime: r.totalClientTime / r.total,
        avgClientToServer: r.totalClientToServer / r.total,
        avgServerToClient: r.totalServerToClient / r.total,
        avgBytesPerMs: r.totalBytes / r.totalProcessTime,
        avgMbytePerSecond: ((r.totalBytes / 1024) / 1024) / (r.totalProcessTime / 1000)
      }
    }
  }
  return finalResult
}

export default evaluateMeasurements
