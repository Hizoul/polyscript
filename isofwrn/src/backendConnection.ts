import url from "isofw-shared/src/globals/url"
import { FeathersClient } from "isofw-shared/src/util/xpfwuifeathers"
import { BackendClient, DbStore, UserStore } from "isofw-shared/src/util/xpfwuishared"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { get } from "lodash"
import { AsyncStorage } from "react-native"

BackendClient.client = FeathersClient

BackendClient.client.connectTo(`${url.webPrefix}${url.mainServer}`, {
    authOptions: {storage: AsyncStorage},
    makeAuth: true,
    useRest: false,
    userStore: UserStore,
    dbStore: DbStore,
    collections
})

for (const collection of collections) {
  BackendClient.client.client.service(collection).timeout = 40000
}
