import { cameraCommand } from "isofw-shared/src/cameraApi"
import { DbStore, toJS } from "isofw-shared/src/util/xpfwdata"
import { ExtendedJSONSchema, FormStore, getMapTo, memo } from "isofw-shared/src/util/xpfwform"
import { PresetActionTypeField, PresetAssistantForm, PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectCameras, ProjectProgram, ProjectShot, ShotCamera, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import usePresetUpdater from "../preset/updater"

const actionPrefix = "actionButtons"

const makeCameraAction = (id: string, patchData: any, prefix?: string) => {
  return async () => {
    FormStore.setValue(String(PresetAssistantForm.title), patchData, prefix)
    const updateRes = await DbStore.patch(id, PresetAssistantForm, undefined, prefix)
    return updateRes
  }
}

const useCameraActions = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  let cameras = FormStore.getValue(ProjectCameras.title, prefix)
  cameras = cameras ? cameras : []
  const value = FormStore.getValue(ShotCamera.title, prefix, cameras[0])
  const currentPreset = FormStore.getValue(ProjectProgram.title, prefix, {})[FormStore.getValue(ProjectShot.title, prefix, 0) - 1]
  const presetHelper = usePresetUpdater(get(currentPreset, ShotPreset.title))
  return {
    cameras,
    value,
    currentPreset,
    loading: false,
    ...presetHelper,
    stopZoom: memo(() => makeCameraAction(value, {
      [String(PresetActionTypeField.title)]: cameraCommand.doZoom,
      [String(PresetNumberField.title)]: 50
    }, prefix), ["zoom", prefix, value, 50]),
    wideZoom: memo(() => makeCameraAction(value, {
      [String(PresetActionTypeField.title)]: cameraCommand.doZoom,
      [String(PresetNumberField.title)]: 55
    }, prefix), ["zoom", prefix, value, 55]),
    teleZoom: memo(() => makeCameraAction(value, {
      [String(PresetActionTypeField.title)]: cameraCommand.doZoom,
      [String(PresetNumberField.title)]: 45
    }, prefix), ["zoom", prefix, value, 45])
  }
}

export default useCameraActions
