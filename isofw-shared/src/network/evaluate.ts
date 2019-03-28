import { get } from "lodash"

const sortNumAscending = (a: any, b: any) => a - b

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
        clientToServer: [], serverToClient: [], roundTrip: [], servertime: [], networkTime: [],
        totalBytes: 0, total: 0,
        totalClientBytes: 0, totalServerBytes: 0,
        totalProcessTime: 0, totalServerTime: 0, totalClientTime: 0,
        totalClientToServer: 0, totalServerToClient: 0
      }
    }
    for (const measure of get(measurement, "measurements", [])) {
      const clientToServer = measure.serverArrive - measure.clientSent
      const serverToClient = measure.clientArrive - measure.serverSent
      result[user][networkType].clientToServer.push(clientToServer)
      result[user][networkType].serverToClient.push(serverToClient)
      result[user][networkType].roundTrip.push(measure.clientProcessTime)
      result[user][networkType].servertime.push(measure.serverProcessTime)
      result[user][networkType].networkTime.push(measure.clientProcessTime - measure.serverProcessTime)
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
    }
  }
  const finalResult: any = {}
  for (const user of Object.keys(result)) {
    finalResult[user] = {}
    for (const networkType of Object.keys(result[user])) {
      const r = result[user][networkType]
      r.roundTrip.sort(sortNumAscending)
      r.networkTime.sort(sortNumAscending)
      finalResult[user][networkType] = {
        ...r,
        avgBytes: r.totalBytes / r.total,
        avgClientBytes: r.totalClientBytes / r.total,
        avgServerBytes: r.totalServerBytes / r.total,
        avgProcessTime: r.totalProcessTime / r.total,
        avgServerTime: r.totalServerTime / r.total,
        avgNetworkTime: (r.totalProcessTime - r.totalServerTime) / r.total,
        avgClientTime: r.totalClientTime / r.total,
        avgClientToServer: r.totalClientToServer / r.total,
        avgServerToClient: r.totalServerToClient / r.total,
        avgBytesPerMs: r.totalBytes / r.totalProcessTime,
        avgMbytePerSecond: ((r.totalBytes / 1024) / 1024) / (r.totalProcessTime / 1000),
        medianRoundTrip: r.roundTrip[Math.round(r.roundTrip.length / 2)],
        medianClientToServer: r.clientToServer.sort(sortNumAscending)[Math.round(r.clientToServer.length / 2)],
        medianServerToClient: r.serverToClient.sort(sortNumAscending)[Math.round(r.serverToClient.length / 2)],
        medianServerProcessTime: r.servertime.sort(sortNumAscending)[Math.round(r.servertime.length / 2)],
        slowestServerToClient: r.serverToClient[r.serverToClient.length - 1], fastestServerToClient: r.serverToClient[0],
        slowestRoundTrip: r.roundTrip[r.roundTrip.length - 1], fastestRoundTrip: r.roundTrip[0],
        slowestServerProcessTime: r.roundTrip[r.roundTrip.length - 1], fastestServerProcessTime: r.roundTrip[0],
        slowestClientToServer: r.clientToServer[r.clientToServer.length - 1], fastestClientToServer: r.clientToServer[0],
        slowestNetworkTime: r.networkTime[r.networkTime.length - 1], fastestNetworkTime: r.networkTime[0],
        clientToServer: [], serverToClient: [], servertime: [], roundTrip: [], networkTime: []
      }
    }
  }
  return finalResult
}

export default evaluateMeasurements
