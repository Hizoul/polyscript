import * as feathers from "@feathersjs/feathers"
import presetCreator from "isofw-node/src/services/hooks/presetCreator"
import cameraApi, { cameraCommand } from "isofw-shared/src/cameraApi"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import {
  EMPTY_PRESET, PresetActionTypeField, PresetCameraField, PresetNumberField, PresetProjectField
} from "isofw-shared/src/xpfwDefs/preset"
import { IsActiveField, ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import activateNextPresets from "./hooks/activateNextPresets"
import freeUnusedPresets, { freePresetsOfProject } from "./hooks/freeUnusedPresets"
import requireAuthentication from "./hooks/requireAuthentication"

const presetAssistantConfigurator: any = (app: feathers.Application) => {

  app.service(val.service.camera).hooks({after: {create: presetCreator}})
  app.service(val.service.project).hooks({after: {patch: [activateNextPresets, freeUnusedPresets]}})

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
    patch: async (id: string, data: any) => {
      const camera = await app.service(val.service.camera).get(id, isServerParams)
      if (!camera) {
        return Promise.reject(" unknown Camera ")
      }
      const cameraIp = camera[String(CameraIp.title)]
      switch (data[String(PresetActionTypeField.title)]) {
        case cameraCommand.goToPreset: {
          return cameraApi.goToPreset(cameraIp, data[String(PresetNumberField.title)])
        }
        case cameraCommand.updatePreset: {
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
