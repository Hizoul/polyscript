import "isofw-shared/src/xpfwDefs"
import * as authentication from "@feathersjs/authentication"
import * as local from "@feathersjs/authentication-local"
import { permission, validate } from "@xpfw/feathers"
import * as memdb from "feathers-memory"
import convertIds from "isofw-node/src/services/hooks/convertIds"
import * as mongoService from "feathers-mongodb"
import { get, isNil } from "lodash"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { ValidationRegistry } from "isofw-shared/src/util/xpfwvalidate"
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
          max: 100
        },
        whitelist: ["$regex", "$options"]
      })
      app.use(collection, service)
      console.log(`Registered XPFW-Collection ${collection}`)
      const servic = app.service(collection)
      const form: any = ValidationRegistry.forms[collection]
      const opts: any = {
        idPath: "_id", serviceName: collection
      }
      servic.hooks({
        before: {
          create: [
            auth.hooks.authenticate("jwt"),
            permission.create(form, opts),
            validate.general(form, "create", opts),
            convertIds("_id", false)
          ],
          update: [
            auth.hooks.authenticate("jwt"),
            permission.update(form, opts),
            validate.general(form, "update", opts),
            convertIds("_id", false)
          ],
          get: [
            auth.hooks.authenticate("jwt"),
            permission.general(form, "get", {...opts, docIdPath: "params.user._id"})
          ],
          find: [
            permission.general(form, "find", opts),
            validate.general(form, "find", opts),
            convertIds("_id", true)
          ],
          patch: [
            auth.hooks.authenticate("jwt"),
            permission.general(form, "patch", opts),
            validate.general(form, "path", opts),
            convertIds("_id", false)
          ],
          remove: [
            auth.hooks.authenticate("jwt"),
            permission.general(form, "remove", opts),
            validate.general(form, "remove", opts)
          ]
        }
      })
    }
  }
}

export default pluginCollections
