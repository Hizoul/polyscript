
import console = require("console")
import makeApp from "isofw-node/src/app"
import val from "isofw-shared/src/globals/val"
import { DbStore, UserStore } from "isofw-shared/src/util/xpfwdata"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { MongoClient } from "mongodb"
import initiateTcp from "../network/tcp"
import emptyPort from "./emptyPort"

const promisifyListen = (app: any, port: number) => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server)
    })
  })
}

const getNetworkTestApp = async (networkType: number, ClientHolder?: any) => {
  let server: any | undefined
  let db: any | undefined
  let c: any
  const port = await emptyPort()

  c = await MongoClient.connect(`mongodb://localhost:27017/`)
  db  = c.db("feathersxpfwvalidatetests" + port)
  const app: any = makeApp(undefined, db)
  if (ClientHolder) {
    if (networkType === val.network.tcp) {
      app.setup()
      server = await initiateTcp(port, app)
      console.log("INITIATED TCP")
    } else {
      server = await promisifyListen(app, port)
    }
    await ClientHolder.connectTo(`localhost`, {
      port,
      useRest: false,
      userStore: UserStore,
      dbStore: DbStore,
      collections
    })
  }
  return Promise.resolve({
    app,
    port,
    cleanUp: async () => {
      await db.dropDatabase()
      await c.close()
      if (ClientHolder) {
        ClientHolder.disconnect()
        server.close()
      }
    }
  })
}

export default getNetworkTestApp
