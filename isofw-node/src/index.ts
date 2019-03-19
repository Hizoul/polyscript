import "isofw-shared/src/xpfwDefs"

import makeApp from "isofw-node/src/app"
import initiateTcp from "isofw-node/src/network/tcp"
import val from "isofw-shared/src/globals/val"
import { isObject, isString } from "lodash"
import { MongoClient } from "mongodb"
import initiateUdp from "./network/udp"

let mongoUrl: any = `mongodb://localhost:27017/`
let networkToUse = val.network.networkToUse

if (isObject(global.process) && isString(process.env.MONGO_URL)) {
  mongoUrl = process.env.MONGO_URL
}

if (isObject(global.process) && isString(process.env.NETWORK_TO_USE)) {
  networkToUse = Number(process.env.NETWORK_TO_USE)
}
console.log("Attempting to connect to database")
MongoClient.connect(mongoUrl, {useNewUrlParser: true}).then((c: any) => {
  const db = c.db("poly-direct")
  console.log("Attempting to start Server")
  const app: any = makeApp(undefined, db)
  if (networkToUse === val.network.tcp) {
    app.setup()
    initiateTcp(4202, app)
  } else if (networkToUse === val.network.udp) {
    app.setup()
    initiateUdp(4202, app)
  } else {
    app.listen(4202, () => {
      console.log("Now listening on http://localhost:4202")
    })
  }
})
