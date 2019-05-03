import * as authenticationA from "@feathersjs/authentication"
import jwt from "@feathersjs/authentication-jwt"
import * as localA from "@feathersjs/authentication-local"
import * as handler from "@feathersjs/errors/handler"
import * as express from "@feathersjs/express"
import * as rest from "@feathersjs/express/rest"
import feathers, { Application, Service } from "@feathersjs/feathers"
import * as sios from "@feathersjs/socketio"
import * as memdb from "feathers-memory"
import * as mongoService from "feathers-mongodb"
import urls from "isofw-shared/src/globals/url"
import { DbStore, UserStore } from "isofw-shared/src/util/xpfwdata"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { isString } from "lodash"
import { MongoClient } from "mongodb"
import customServiceConfigurator from "../services/index"
import convertIds from "./convertIds"
import emptyPort from "./emptyPort"

const sio: any = sios
const res: any = rest
const mongoServic: any = mongoService
const memd: any = memdb
const local: any = localA
const authentication: any = authenticationA
const hooks = local.hooks
const promisifyListen = (app: any, port: number) => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server)
    })
  })
}

const getRandomApp = async (memoryServiceName: string,
                            useMongo?: boolean, ClientHolder?: any, useRest: boolean = false) => {
  const app: any = express.default(feathers())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  let col: any | undefined
  let db: any | undefined
  let c: any
  const port = await emptyPort()
  urls.port = port
  app.configure(useRest ? res() : sio())
  if (useMongo) {
    c = await MongoClient.connect(`mongodb://localhost:27017/`, {useNewUrlParser: true})
    db  = c.db("feathersxpfwvalidatetests" + port)
    col = db.collection(`testFor${memoryServiceName}`)
    app.use(memoryServiceName, mongoServic({
      Model: col
    }))

    const options: any = {}
    options.secret = `mysecret`
    app.configure(authentication(options))
    // Register our local (username + password) authentication plugin
    app.configure(local())
    // Register our JWT authentication plugin
    app.configure(jwt())
    app.use("/users", new mongoServic({
      Model: db.collection("users"),
      paginate: {
        default: 10,
        max: 100
      }
    }))
    app.service("users").hooks({
      // Make sure `password` never gets sent to the client
      after: hooks.protect("password"),
      before: {
        find: [
          authentication.hooks.authenticate("jwt"),
          convertIds("_id", true)
        ],
        create: [
          hooks.hashPassword({ passwordField: "password" })
        ]
      }
    })
    app.service("authentication").hooks({
    before: {
     create: [
      // You can chain multiple strategies
      authentication.hooks.authenticate(["local", "jwt"])
     ],
     remove: [
      authentication.hooks.authenticate("jwt")
     ]
    }
   })
    app.configure(customServiceConfigurator(db))
  } else {
    app.use(memoryServiceName, memd())
  }
  let server: any
  if (ClientHolder) {
    server = await promisifyListen(app, port)
    ClientHolder.connectTo(`http://localhost:${port}`, {
      useRest,
      userStore: UserStore,
      dbStore: DbStore,
      collections
    })
  }
  return Promise.resolve({
    app,
    port,
    service: app.service(memoryServiceName),
    cleanUp: async () => {
      if (useMongo) {
        await db.dropDatabase()
        await c.close()
      }
      if (ClientHolder) {
        ClientHolder.disconnect(useRest)
        server.close()
      }
    }
  })
}

export default getRandomApp
