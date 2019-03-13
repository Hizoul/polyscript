import { FeathersClient } from "@xpfw/data-feathers"
// import TCPClient from "isofw-shared/src/network/tcpClient";
// import UDPClient from "isofw-shared/src/network/udpClient";
import url from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import makeBenchmarkClient from "isofw-shared/src/network/clientBenchmarker"
import { BackendClient, DbStore, UserStore } from "isofw-shared/src/util/xpfwdata"
import collections from "isofw-shared/src/xpfwDefs/collections"

const connect = (storage: any) => {
  let clientToUse = FeathersClient
  // if (val.network.networkToUse === val.network.tcp) {
  //   clientToUse = TCPClient
  // } else if (val.network.networkToUse === val.network.udp) {
  //   clientToUse = UDPClient
  // }
  BackendClient.client = clientToUse
  if (val.network.benchmarkEnabled) {
    BackendClient.client = makeBenchmarkClient(clientToUse, val.network.networkToUse)
  }
  // feathersClientOptions.batchService = val.service.batch
  BackendClient.client.connectTo(`${url.webPrefix}${url.mainServer}`, {
      authOptions: {storage},
      makeAuth: true,
      useRest: false,
      userStore: UserStore,
      dbStore: DbStore,
      collections
  })

  if (!val.network.benchmarkEnabled) {
    for (const collection of collections) {
      BackendClient.client.client.service(collection).timeout = 40000
    }
  }
}

export default connect
