import "isofw-shared/src/xpfwDefs"

import makeApp from "isofw-node/src/app"
import initiateTcp from "isofw-node/src/network/tcp"
import val from "isofw-shared/src/globals/val"
import { isObject, isString } from "lodash"
import connectMongo from "./connectMongo"
import initiateUdp from "./network/udp"

const useNedb = process != null && process.env != null && process.env.USE_NEDB != null
let networkToUse = val.network.networkToUse

if (global.process != null && isString(process.env.NETWORK_TO_USE)) {
  networkToUse = Number(process.env.NETWORK_TO_USE)
}
if (global.process != null && process.env.USE_COMPRESSION != null) {
  val.network.useCompression = true
}

const appStuff = (db?: any, alsoListen?: boolean) => {
  console.log("Attempting to start Server")
  const app: any = makeApp(undefined, db)
  if (alsoListen) {
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
  } else {
    app.setup()
  }
  return app
}

const initiateApp = async (alsoListen?: boolean) => {
  console.log("Attempting to connect to database")
  if (useNedb) {
    return appStuff(undefined, alsoListen)
  } else {
    return appStuff(await connectMongo(), alsoListen)
  }
}

export default initiateApp
