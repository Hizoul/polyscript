import * as express from "@feathersjs/express"
import * as rest from "@feathersjs/express/rest"
import feathers, { Application, Service } from "@feathersjs/feathers"
import { cameraCommand } from "isofw-shared/src/cameraApi"
import { get } from "lodash"
import emptyPort from "./emptyPort"

const promisifyListen = (app: any, port: number) => {
  return new Promise((resolve) => {
    const server = app.listen(port, () => {
      resolve(server)
    })
  })
}

const getCameraMock = async () => {
  const requests: any[] = []
  const app = express.default(feathers())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.configure(rest())
  app.use("*", (request, response) => {
    requests.push({query: request.query, params: request.params})
    let type: any
    const cmd: string = get(request, "query.cmd", "")
    if (cmd.startsWith("M")) {
      type = cameraCommand.updatePreset
    } else if (cmd.startsWith("R")) {
      type = cameraCommand.goToPreset
    } else if (cmd.startsWith("Z")) {
      type = cameraCommand.startZoom
    }
    switch (type) {
      case cameraCommand.goToPreset: {
        response.send("s" + cmd.substring(1))
      }
      case cameraCommand.updatePreset: {
        response.send("s" + cmd.substring(1))
      }
      case cameraCommand.startZoom: {
        response.send("zS" + cmd.substring(1))
      }
      case cameraCommand.stopZoom: {
      }
    }
    response.send(" empty ")
  })
  let server: any
  const port = await emptyPort()
  server = await promisifyListen(app, port)
  return Promise.resolve({
    app,
    port,
    requests,
    cleanUp: async () => {
      server.close()
    }
  })
}

export default getCameraMock
