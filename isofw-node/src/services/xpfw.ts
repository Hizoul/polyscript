import * as authentication from "@feathersjs/authentication"
import * as memdb from "feathers-memory"
import * as mongoService from "feathers-mongodb"
import convertIds from "isofw-node/src/services/hooks/convertIds"
import "isofw-shared/src/xpfwDefs"
import collections from "isofw-shared/src/xpfwDefs/collections"

const memd: any = memdb

const auth: any = authentication
const mognoServic: any = mongoService
const pluginCollections = (db: any) => {
  return async (app: any) => {
    for (const collection of collections) {
      const col = db.collection(collection)
      const service = new mognoServic({
        Model: col,
        paginate: {
          default: 10,
          max: 10000
        },
        whitelist: ["$regex", "$options", "$skip", "$limit", "$sort"]
      })
      app.use(collection, service)
      console.log(`Registered XPFW-Collection ${collection}`)
      const servic = app.service(collection)
      servic.hooks({
        before: {
          create: [
            auth.hooks.authenticate("jwt"),
            convertIds("_id", false)
          ],
          update: [
            auth.hooks.authenticate("jwt"),
            convertIds("_id", false)
          ],
          get: [
            auth.hooks.authenticate("jwt")
          ],
          find: [
            auth.hooks.authenticate("jwt"),
            convertIds("_id", true)
          ],
          patch: [
            auth.hooks.authenticate("jwt"),
            convertIds("_id", false)
          ],
          remove: [
            auth.hooks.authenticate("jwt")
          ]
        }
      })
    }
  }
}

export default pluginCollections
