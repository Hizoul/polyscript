import { DbStore } from "@xpfw/data"
import { memo, prependPrefix, useField } from "@xpfw/form"
import { cameraCommand } from "isofw-shared/src/cameraApi"
import val from "isofw-shared/src/globals/val"
import { PresetActionTypeField, PresetAssistantForm, PresetCameraField, PresetForm, PresetIsReadyField } from "isofw-shared/src/xpfwDefs/preset"
import { get } from "lodash"

const updatePrefix = "presetUpdater"
const presetFormHelper = useField(String(PresetForm.title), updatePrefix)
const presetAssistantFormHelper = useField(String(PresetAssistantForm.title), updatePrefix)
const presetIsReadyHelper = useField(String(PresetIsReadyField.title), prependPrefix(String(PresetForm.title), updatePrefix))

const updatePresetReadiness = (presetId: string, isReady: boolean) => {
  return async () => {
    presetFormHelper.setValue({isReady})
    const updateRes = await DbStore.patch(presetId, PresetForm, undefined, updatePrefix)
    return updateRes
  }
}
const savePresetData = (presetId: string) => {
  return async () => {
    presetAssistantFormHelper.setValue({
      [String(PresetActionTypeField.title)]: cameraCommand.updatePreset,
      [String(PresetCameraField.title)]: presetId
    })
    const preset = await DbStore.getFromServer(presetId, val.service.preset)
    const updateRes = await DbStore.patch(preset[String(PresetCameraField.title)], PresetAssistantForm, undefined, updatePrefix)
    return updateRes
  }
}

const usePresetUpdater = (id: string) => {
  const item = DbStore.getGetState(id, val.service.preset, true)
  return {
    item,
    isReady: get(item, String(PresetIsReadyField.title), false),
    setReady: memo(() => updatePresetReadiness(id, true), [updatePrefix, id, true]),
    setNotReady: memo(() => updatePresetReadiness(id, false), [updatePrefix, id, false]),
    savePreset: memo(() => savePresetData(id), ["savePreset", updatePrefix, id])
  }
}

export interface IPresetUpdaterProps {id: string}

const usePresetUpdaterWithProps = (props: IPresetUpdaterProps) => usePresetUpdater(props.id)

export default usePresetUpdater
export {
  updatePresetReadiness as updatePreset, usePresetUpdaterWithProps,
  savePresetData
}
