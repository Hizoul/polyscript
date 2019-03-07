import "isofw-shared/src/xpfwDefs"

import makeApp from "isofw-node/src/app"
import initiateTcp from "isofw-node/src/network/tcp"
import { get, isObject, isString } from "lodash"
import { MongoClient } from "mongodb"

let mongoUrl: any = `mongodb://localhost:27017/`
const type = 1

if (isObject(global.process) && isString(process.env.MONGO_URL)) {
  mongoUrl = process.env.MONGO_URL
}
console.log("Attempting to connect to database")
MongoClient.connect(mongoUrl).then((c: any) => {
  const db = c.db("poly-direct")
  console.log("Attempting to start Server")
  const app: any = makeApp(undefined, db)
  if (type === 1) {
    initiateTcp(4202, app)
  } else {
    app.listen(4202, () => {
      console.log("Now listening on http://localhost:4202")
    })
  }

})
