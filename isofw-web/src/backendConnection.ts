import { BackendClient, DbStore, UserStore } from "@xpfw/data"
import { FeathersClient } from "@xpfw/data-feathers"
import url from "isofw-shared/src/globals/url"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { get } from "lodash"

BackendClient.client = FeathersClient

BackendClient.client.connectTo(`${url.webPrefix}${url.mainServer}`, {
    authOptions: {storage: get(global, "window.localStorage")},
    makeAuth: true,
    useRest: false,
    userStore: UserStore,
    dbStore: DbStore,
    collections
})

for (const collection of collections) {
  BackendClient.client.client.service(collection).timeout = 40000
}
