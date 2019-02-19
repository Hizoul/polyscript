import { DbStore } from "isofw-shared/src/util/xpfwdata"
import { ExtendedJSONSchema, FormStore, getMapTo, memo, prependPrefix } from "isofw-shared/src/util/xpfwform"
import { PresetAssistantForm, PresetCameraField, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectCameras, ShotPreset } from "isofw-shared/src/xpfwDefs/project"

const popupVisibilityKey = "cameraChoice"
const freePresetKey = "freePresetGetter"

const togglePop = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo)}
  return (newValue?: any) => {
    if (newValue && newValue.type === "popup:closed") {
      newValue = false
    }
    FormStore.setValue(mapTo, newValue, prependPrefix(prefix, popupVisibilityKey))
  }
}
const untypedDbStore: any = DbStore

const setValueWithPreset = (schema: ExtendedJSONSchema, mapTo?: any, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo)}
  return async (newValue?: any) => {
    const creationPrefix = prependPrefix(prefix, `${freePresetKey}${PresetAssistantForm.title}`)
    FormStore.setValue(schema.title, newValue, prefix)
    FormStore.setValue(PresetAssistantForm.title, {}, prependPrefix(prefix, freePresetKey))
    FormStore.setValue(PresetCameraField.title, newValue, creationPrefix)
    FormStore.setValue(PresetProjectField.title, untypedDbStore.currentlyEditing, creationPrefix)
    const freeId: any = await DbStore.create(PresetAssistantForm, creationPrefix)
    mapTo = mapTo.substring(0, mapTo.indexOf("]") + 1)
    FormStore.setValue(`${prependPrefix(mapTo, prefix)}.${ShotPreset.title}`, freeId)
    return freeId
  }
}

const useCameraChooser = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  let cameras = FormStore.getValue(ProjectCameras.title, prefix)
  cameras = cameras ? cameras : []
  return {
    cameras,
    value: FormStore.getValue(schema.title, prefix),
    showPopUp: FormStore.getValue(mapTo, prependPrefix(popupVisibilityKey, prefix)),
    hidePop: memo(() => togglePop(schema, mapTo, prefix)(0), ["hidePop", mapTo, prefix]),
    showPop: memo(() => togglePop(schema, mapTo, prefix)(1), ["showPop", mapTo, prefix]),
    setValueWithPreset: memo(() => setValueWithPreset(schema, mapTo, prefix), ["setValueWithPreset", JSON.stringify(schema), mapTo, prefix])
  }
}

export default useCameraChooser
export { togglePop, setValueWithPreset }
