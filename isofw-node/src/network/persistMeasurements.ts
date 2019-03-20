import "isofw-shared/src/xpfwDefs"

import { writeFileSync } from "fs"
import makeApp from "isofw-node/src/app"
import initiateTcp from "isofw-node/src/network/tcp"
import val from "isofw-shared/src/globals/val"
import { isObject, isString } from "lodash"
import { MongoClient } from "mongodb"
import iterateEachInFind from "./iterateEachInFind"

let mongoUrl: any = `mongodb://localhost:27017/`

if (isObject(global.process) && isString(process.env.MONGO_URL)) {
  mongoUrl = process.env.MONGO_URL
}
console.log("Attempting to connect to database")
MongoClient.connect(mongoUrl, {useNewUrlParser: true}).then(async (c: any) => {
  const db = c.db("poly-direct")
  const app: any = makeApp(undefined, db)
  const entries: any[] = []
  console.log("Attempting to collect entries")
  await iterateEachInFind(val.service.benchmarkResults, undefined, (c, q) => {
    return app.service(val.service.benchmarkResults).find({query: q})
  }, (obj: any) => {
    entries.push(obj)
    return Promise.resolve()
  }, {pageSize: 9999})
  const fileName = "my_measurements.txt"
  writeFileSync(fileName, JSON.stringify(entries))
  console.log("Written measurements to", fileName)
  for (const entry of entries) {
    await app.service(val.service.benchmarkResults).remove(entry._id)
    console.log("Deleted ", entry._id)
  }
  c.close()
  process.exit(0)
})
