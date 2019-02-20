import { FeathersClient } from "@xpfw/data-feathers"
import url from "isofw-shared/src/globals/url"
import { BackendClient, DbStore, UserStore } from "isofw-shared/src/util/xpfwdata"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { get } from "lodash"

const connect = (storage: any) => {
  BackendClient.client = FeathersClient

  BackendClient.client.connectTo(`${url.webPrefix}${url.mainServer}`, {
      authOptions: {storage},
      makeAuth: true,
      useRest: false,
      userStore: UserStore,
      dbStore: DbStore,
      collections
  })

  for (const collection of collections) {
    BackendClient.client.client.service(collection).timeout = 40000
  }
}

export default connect
