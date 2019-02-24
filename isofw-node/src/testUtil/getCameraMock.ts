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
  let currentZoom = "FFF"
  let currentPan = "7FFF"
  let currentTilt = "7FFF"
  let currentFocus = "FFF"
  let currentIris = "FFF"
  const requests: any[] = []
  const app = express.default(feathers())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.configure(rest())
  app.use("*", (request, response) => {
    requests.push({query: request.query, params: request.params})
    let type: any
    const cmd: string = get(request, "query.cmd", "")
    if (cmd.startsWith("#M")) {
      type = cameraCommand.updatePreset
    } else if (cmd.startsWith("#R")) {
      type = cameraCommand.goToPreset
    } else if (cmd.startsWith("#Z")) {
      type = cameraCommand.doZoom
    } else if (cmd.startsWith("#APC")) {
      type = cmd === "#APC" ? cameraCommand.getPanTilt : cameraCommand.doPanTilt
    } else if (cmd.startsWith("#AXZ")) {
      type = cameraCommand.zoomToPoint
    } else if (cmd.startsWith("#AXF")) {
      type = cameraCommand.focusToPoint
    } else if (cmd.startsWith("#AXI")) {
      type = cameraCommand.irisToPoint
    } else if (cmd.startsWith("#GZ")) {
      type = cameraCommand.getZoom
    } else if (cmd.startsWith("#GF")) {
      type = cameraCommand.getFocus
    } else if (cmd.startsWith("#GI")) {
      type = cameraCommand.getIris
    }
    switch (type) {
      case cameraCommand.goToPreset: {
        response.send("s" + cmd.substring(2))
        return
      }
      case cameraCommand.updatePreset: {
        response.send("s" + cmd.substring(2))
        return
      }
      case cameraCommand.doZoom: {
        response.send("zS" + cmd.substring(2))
        return
      }
      case cameraCommand.getPanTilt: {
        response.send("aPC" + currentPan + currentTilt)
        return
      }
      case cameraCommand.getZoom: {
        response.send("gz" + currentZoom)
        return
      }
      case cameraCommand.getFocus: {
        response.send("gf" + currentFocus)
        return
      }
      case cameraCommand.getIris: {
        response.send("gi" + currentIris)
        return
      }
      case cameraCommand.doPanTilt: {
        currentPan = cmd.substring(3, 7)
        currentTilt = cmd.substring(7)
        response.send("aPC" + currentPan + currentTilt)
      }
      case cameraCommand.zoomToPoint: {
        currentZoom = cmd.substring(3)
        response.send("axz" + currentZoom)
      }
      case cameraCommand.focusToPoint: {
        currentFocus = cmd.substring(3)
        response.send("axf" + currentFocus)
      }
      case cameraCommand.irisToPoint: {
        currentIris = cmd.substring(3)
        response.send("axi" + currentIris)
      }
      default: {
        response.send(" empty ")
        return
      }
    }
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
