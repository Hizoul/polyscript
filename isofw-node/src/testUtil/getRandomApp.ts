import * as authentication from "@feathersjs/authentication"
import * as handler from "@feathersjs/errors/handler"
import * as express from "@feathersjs/express"
import * as rest from "@feathersjs/express/rest"
import feathers, { Application, Service } from "@feathersjs/feathers"
import * as sios from "@feathersjs/socketio"
import * as memdb from "feathers-memory"
import * as mongoService from "feathers-mongodb"
import { isString } from "lodash"
import { MongoClient } from "mongodb"
import emptyPort from "./emptyPort"
const sio: any = sios
const res: any = rest
const mongoServic: any = mongoService
const memd: any = memdb

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
  app.configure(useRest ? res() : sio())
  if (useMongo) {
    c = await MongoClient.connect(`mongodb://localhost:27017/`)
    db  = c.db("feathersxpfwvalidatetests")
    col = db.collection(`testFor${memoryServiceName}`)
    app.use(memoryServiceName, mongoServic({
      Model: col
    }))
  } else {
    app.use(memoryServiceName, memd())
  }
  let port = -1
  let server: any
  if (ClientHolder) {
    port = await emptyPort()
    server = await promisifyListen(app, port)
    ClientHolder.connectTo(`http://localhost:${port}`, useRest)
  }
  return Promise.resolve({
    app,
    port,
    service: app.service(memoryServiceName),
    cleanUp: async () => {
      if (useMongo) {
        await col.drop()
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
