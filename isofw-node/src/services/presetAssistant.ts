import * as feathers from "@feathersjs/feathers"
import presetCreator from "isofw-node/src/services/hooks/presetCreator"
import cameraApi, { cameraCommand } from "isofw-shared/src/cameraApi"
import { getPresetDataUE70 } from "isofw-shared/src/cameraApi/ue70"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import {
  EMPTY_PRESET, PresetActionTypeField, PresetCameraField, PresetFocusField, PresetIrisField,
  PresetNumberField, PresetPanField, PresetProjectField, PresetTiltField, PresetZoomField
} from "isofw-shared/src/xpfwDefs/preset"
import { IsActiveField, ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import activateNextPresets from "./hooks/activateNextPresets"
import ensureShotNumber from "./hooks/ensureShotNumber"
import freeUnusedPresets, { freePresetsOfProject } from "./hooks/freeUnusedPresets"
import requireAuthentication from "./hooks/requireAuthentication"

const presetAssistantConfigurator: any = (app: feathers.Application) => {

  app.service(val.service.camera).hooks({after: {create: presetCreator}})
  app.service(val.service.project).hooks({after: {patch: [activateNextPresets, freeUnusedPresets, ensureShotNumber]}})

  const presentAssistanceService = {
    create: async (data: any) => {
      const cameraId = get(data, String(PresetCameraField.title), " not findable ")
      const projectId = get(data, String(PresetProjectField.title))
      if (!cameraId || !projectId) {
        return Promise.reject("need project id and camera id")
      }
      const availablePresets = await app.service(val.service.preset).find({...isServerParams, query: {
        [String(PresetCameraField.title)]: cameraId,
        [String(PresetProjectField.title)]: EMPTY_PRESET
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
        [String(IsActiveField.title)]: false,
        [String(ProjectProgram.title)]: newProgram
      }, isServerParams)
    },
    patch: async (id: string, data: any, params: any) => {
      const camera = await app.service(val.service.camera).get(id, isServerParams)
      if (!camera) {
        return Promise.reject(" unknown Camera ")
      }
      const cameraIp = camera[String(CameraIp.title)]
      switch (data[String(PresetActionTypeField.title)]) {
        case cameraCommand.goToPreset: {
          if (val.handlePresetsSelf) {
            const preset = await app.service(val.service.preset).get(data[String(PresetCameraField.title)])
            const promises = [
              cameraApi.doPanTiltToPosition(cameraIp,
                preset[String(PresetPanField.title)], preset[String(PresetTiltField.title)]),
              cameraApi.doZoomToPosition(cameraIp, preset[String(PresetZoomField.title)]),
              cameraApi.doFocusToPosition(cameraIp, preset[String(PresetFocusField.title)]),
              cameraApi.doIrisToPosition(cameraIp, preset[String(PresetIrisField.title)])
            ]
            return Promise.all(promises)
          }
          return cameraApi.goToPreset(cameraIp, data[String(PresetNumberField.title)])
        }
        case cameraCommand.updatePreset: {
          if (val.handlePresetsSelf) {
            const presetData = await getPresetDataUE70(cameraIp)
            await app.service(val.service.preset).patch(data[String(PresetCameraField.title)], presetData, params)
          }
          return cameraApi.updatePreset(cameraIp, data[String(PresetNumberField.title)])
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
