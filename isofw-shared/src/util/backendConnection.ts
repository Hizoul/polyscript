import { FeathersClient } from "@xpfw/data-feathers"
import url from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import makeBenchmarkClient from "isofw-shared/src/network/clientBenchmarker"
import { BackendClient, DbStore, UserStore } from "isofw-shared/src/util/xpfwdata"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { ProjectForm } from "isofw-shared/src/xpfwDefs/project"

const connect = async (storage: any, getClient?: any) => {
  let clientToUse = getClient ? getClient() : FeathersClient
  if (clientToUse == null) {
    clientToUse = FeathersClient
  }
  BackendClient.client = clientToUse
  if (val.network.benchmarkEnabled) {
    BackendClient.client = makeBenchmarkClient(clientToUse, val.network.networkToUse)
  }
  // feathersClientOptions.batchService = val.service.batch
  const connectionOptions: any = {
    authOptions: {storage, timeout: 40000},
    port: url.port,
    makeAuth: true,
    useRest: false,
    userStore: UserStore,
    dbStore: DbStore,
    collections
}
  await BackendClient.client.connectTo(
    val.network.networkToUse === val.network.websocket ?
    `${url.webPrefix}${url.mainServer}:${url.port}` : url.mainServer, connectionOptions)

  for (const collection of collections) {
    BackendClient.client.client.service(collection).timeout = 40000
  }

  DbStore.formsToUpdate.push({
    collection: val.service.project,
    mapTo: String(ProjectForm.title),
    prefix: "edit"
  })
}

export default connect
