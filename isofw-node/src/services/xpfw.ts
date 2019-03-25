import * as authentication from "@feathersjs/authentication"
import * as mongoService from "feathers-mongodb"
import * as nedbService from "feathers-nedb"
import convertIds from "isofw-node/src/services/hooks/convertIds"
import "isofw-shared/src/xpfwDefs"
import collections from "isofw-shared/src/xpfwDefs/collections"
import * as NeDB from "nedb"
import requireAuthentication from "./hooks/requireAuthentication"

const auth: any = authentication
const mognoServic: any = mongoService
const pluginCollections = (db: any) => {
  return async (app: any) => {
    for (const collection of collections) {
      let service
      if (db == null) {
        const col = new NeDB({filename: collection, autoload: true})
        service = new nedbService({
          Model: col,
          paginate: {
            default: 10,
            max: 10000
          },
          whitelist: ["$regex", "$options", "$skip", "$limit", "$sort"]
        })
      } else {
        const col = db.collection(collection)
        service = new mognoServic({
          Model: col,
          paginate: {
            default: 10,
            max: 10000
          },
          whitelist: ["$regex", "$options", "$skip", "$limit", "$sort"]
        })
      }
      app.use(collection, service)
      console.log(`Registered XPFW-Collection ${collection}`)
      const servic = app.service(collection)
      servic.hooks(requireAuthentication)
      if (db != null) {
        servic.hooks({
          before: {
            create: [
              convertIds("_id", false)
            ],
            update: [
              convertIds("_id", false)
            ],
            find: [
              convertIds("_id", true)
            ],
            patch: [
              convertIds("_id", false)
            ]
          }
        })
      }
    }
  }
}

export default pluginCollections
