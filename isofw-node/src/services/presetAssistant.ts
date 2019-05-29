import * as express from "@feathersjs/express"
import * as feathers from "@feathersjs/feathers"
import presetCreator from "isofw-node/src/services/hooks/presetCreator"
import cameraApi, { cameraCommand } from "isofw-shared/src/cameraApi"
import { getPresetDataUE70 } from "isofw-shared/src/cameraApi/ue70"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import {
  defaultPresetSort, EMPTY_PRESET, PresetActionTypeField, PresetCameraField, PresetFocusField,
  PresetIrisField, PresetNumberField, PresetPanField, PresetPreviewField, PresetProjectField,
  PresetTiltField,
  PresetZoomField
} from "isofw-shared/src/xpfwDefs/preset"
import { IsActiveField, ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import * as moment from "moment"
import { resolve } from "path"
import { cp, mkdir } from "shelljs"
import activateNextPresets from "./hooks/activateNextPresets"
import ensureShotNumber from "./hooks/ensureShotNumber"
import forkedHooks from "./hooks/forkedHooks"
import freeUnusedPresets, { freePresetsOfProject } from "./hooks/freeUnusedPresets"
import requireAuthentication from "./hooks/requireAuthentication"

const useAsyncHook = global.process != null && process.env.ASYNC_HOOKS != null
const fileDirectory = val.isDebug ? `/tmp/Polly${urls.port}` :
(global.process != null && process.env.PREVIEW_DIRECTORY != null ?
  process.env.PREVIEW_DIRECTORY : __dirname + "previews")
const makePreview = async (id: string, cameraIp: string) => {
  const filename =  `${id}-${Date.now()}.jpg`
  const dateDirectory = moment().format("YYYY-MM-DD")
  mkdir("-p", resolve(fileDirectory, dateDirectory))
  if (val.isDebug) {
    cp(resolve(__dirname, "concert.jpg"), resolve(fileDirectory, dateDirectory, filename))
  } else {

  }
  return dateDirectory + "/" + filename
}
const presetAssistantConfigurator: any = (app: feathers.Application) => {

  app.service(val.service.camera).hooks({after: {create: presetCreator}})
  app.service(val.service.project).hooks({after: {patch: [activateNextPresets, freeUnusedPresets, ensureShotNumber]}})
  const previewHandler: any =  express.static(fileDirectory)
  app.use(urls.presetPreview, previewHandler)
  console.log("Serving preset previews from ", fileDirectory)

  const presentAssistanceService = {
    create: async (data: any) => {
      const cameraId = get(data, String(PresetCameraField.title), " not findable ")
      const projectId = get(data, String(PresetProjectField.title))
      if (!cameraId || !projectId) {
        return Promise.reject("need project id and camera id")
      }
      const availablePresets = await app.service(val.service.preset).find({...isServerParams, query: {
        [String(PresetCameraField.title)]: cameraId,
        [String(PresetProjectField.title)]: EMPTY_PRESET,
        $sort: defaultPresetSort
      }})
      if (availablePresets && availablePresets.data && availablePresets.data.length > 0) {
        const foundId = availablePresets.data[0]._id
        await app.service(val.service.preset).patch(foundId, {
          [String(PresetProjectField.title)]: projectId
        }, isServerParams)
        return foundId
      }
      return ""
    },
    get: async (id: string) => {
      const project = await app.service(val.service.project).get(id, isServerParams)
      const newProgram = project[String(ProjectProgram.title)]
      const isActive = project[String(IsActiveField.title)]
      if (isActive) {
        await freePresetsOfProject(app, id, true)
        if (Array.isArray(newProgram)) {
          newProgram.forEach((item: any) => {
            delete item[String(ShotPreset.title)]
          })
        }
      }
      return app.service(val.service.project).patch(id, {
        [String(IsActiveField.title)]: !isActive,
        [String(ProjectProgram.title)]: newProgram
      }, isServerParams)
    },
    patch: async (id: string, data: any, params: any) => {
      const camera = await app.service(val.service.camera).get(id, isServerParams)
      console.log(" in camera command ", id, data)
      if (!camera) {
        return Promise.reject(" unknown Camera ")
      }
      const cameraIp = camera[String(CameraIp.title)]
      switch (data[String(PresetActionTypeField.title)]) {
        case cameraCommand.goToPreset: {
          if (val.handlePresetsSelf) {
            const preset = await app.service(val.service.preset).get(data[String(PresetCameraField.title)])
            if (val.isDebug) { // for stable api.ts.snap snapshot
              await cameraApi.doPanTiltToPosition(cameraIp,
                preset[String(PresetPanField.title)], preset[String(PresetTiltField.title)])
              await cameraApi.doZoomToPosition(cameraIp, preset[String(PresetZoomField.title)])
              await cameraApi.doFocusToPosition(cameraIp, preset[String(PresetFocusField.title)])
              await cameraApi.doIrisToPosition(cameraIp, preset[String(PresetIrisField.title)])
              return {ok: true}
            } else {
              const promises = [
                cameraApi.doPanTiltToPosition(cameraIp,
                  preset[String(PresetPanField.title)], preset[String(PresetTiltField.title)]),
                cameraApi.doZoomToPosition(cameraIp, preset[String(PresetZoomField.title)]),
                cameraApi.doFocusToPosition(cameraIp, preset[String(PresetFocusField.title)]),
                cameraApi.doIrisToPosition(cameraIp, preset[String(PresetIrisField.title)])
              ]
              return Promise.all(promises)
            }
          }
          return cameraApi.goToPreset(cameraIp, data[String(PresetNumberField.title)])
        }
        case cameraCommand.updatePreset: {
          const preview = makePreview(id, cameraIp)
          const updatePromise = cameraApi.updatePreset(cameraIp, data[String(PresetNumberField.title)])
          let patchData = {
            [String(PresetPreviewField.title)]: await preview
          }
          if (val.handlePresetsSelf) {
            patchData = {
              ...patchData,
              ...await getPresetDataUE70(cameraIp)
            }
          }
          await app.service(val.service.preset).patch(data[String(PresetCameraField.title)], patchData, params)
          return updatePromise
        }
        case cameraCommand.doZoom: {
          return cameraApi.doZoom(cameraIp, data[String(PresetNumberField.title)])
        }
        default: {
          return Promise.resolve(" unknown command ")
        }
      }
    }
  }
  app.use(val.service.presetAssistant, presentAssistanceService)
  app.service(val.service.presetAssistant).hooks(requireAuthentication)
  return app
}

export default presetAssistantConfigurator
