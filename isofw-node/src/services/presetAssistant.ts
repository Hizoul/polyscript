import * as feathers from "@feathersjs/feathers"
import presetCreator from "isofw-node/src/services/hooks/presetCreator"
import cameraApi, { cameraCommand } from "isofw-shared/src/cameraApi"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { EMPTY_PRESET, PresetActionTypeField, PresetCameraField, PresetNumberField, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { get } from "lodash"
import { IsActiveField, ProjectProgram, ShotPreset } from "../../../isofw-shared/src/xpfwDefs/project"
import freeUnusedPresets, { freePresetsOfProject } from "./hooks/freeUnusedPresets"
import requireAuthentication from "./hooks/requireAuthentication"

const presetAssistantConfigurator: any = (app: feathers.Application) => {
  app.service(val.service.camera).hooks({after: {create: presetCreator}})
  app.service(val.service.project).hooks({after: {patch: freeUnusedPresets}})
  const presentAssistanceService = {
    create: async (data: any) => {
      const cameraId = get(data, PresetCameraField.mapTo, " not findable ")
      const projectId = get(data, PresetProjectField.mapTo)
      if (!cameraId || !projectId) {
        return Promise.reject("need project id and camera id")
      }
      const availablePresets = await app.service(val.service.preset).find({...isServerParams, query: {
        [PresetCameraField.mapTo]: cameraId,
        [PresetProjectField.mapTo]: EMPTY_PRESET
      }})
      if (availablePresets && availablePresets.data && availablePresets.data.length > 0) {
        const foundId = availablePresets.data[0]._id
        await app.service(val.service.preset).patch(foundId, {
          [PresetProjectField.mapTo]: projectId
        }, isServerParams)
        return foundId
      }
      return ""
    },
    get: async (id: string) => {
      const project = await app.service(val.service.project).get(id, isServerParams)
      const newProgram = project[ProjectProgram.mapTo]
      const isActive = project[IsActiveField.mapTo]
      if (isActive) {
        await freePresetsOfProject(app, id, true)
        if (Array.isArray(newProgram)) {
          newProgram.forEach((item: any) => {
            delete item[ShotPreset.mapTo]
          })
        }
      }
      return app.service(val.service.project).patch(id, {
        [IsActiveField.mapTo]: !isActive,
        [ProjectProgram.mapTo]: newProgram
      }, isServerParams)
    },
    patch: async (id: string, data: any) => {
      const camera = await app.service(val.service.camera).get(id, isServerParams)
      if (!camera) {
        return Promise.reject(" unknown Camera ")
      }
      console.log("CAMERA WAS FOUND", data)
      const cameraIp = camera[CameraIp.mapTo]
      switch (data[PresetActionTypeField.mapTo]) {
        case cameraCommand.goToPreset: {
          return cameraApi.goToPreset(cameraIp, data[PresetNumberField.mapTo])
        }
        case cameraCommand.updatePreset: {
          return cameraApi.updatePreset(cameraIp, data[PresetNumberField.mapTo])
        }
        case cameraCommand.doZoom: {
          return cameraApi.doZoom(cameraIp, data[PresetNumberField.mapTo])
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
