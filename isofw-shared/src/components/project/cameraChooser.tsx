import { DbStore } from "isofw-shared/src/util/xpfwdata"
import { ExtendedJSONSchema, FormStore, getMapTo, memo, prependPrefix } from "isofw-shared/src/util/xpfwform"
import { PresetAssistantForm, PresetCameraField, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectCameras, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { flow } from "mobx"

const popupVisibilityKey = "cameraChoice"
const freePresetKey = "freePresetGetter"

const togglePop = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, newValue?: any) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo)}
  return () => {
    FormStore.setValue(mapTo, newValue, prependPrefix(prefix, popupVisibilityKey))
  }
}
const untypedDbStore: any = DbStore

const setValueWithPreset = (schema: ExtendedJSONSchema, mapTo?: any, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo)}
  return flow(function *(newValue?: any) {
    const creationPrefix = prependPrefix(`${prependPrefix(PresetAssistantForm.title, freePresetKey)}`, prefix)
    FormStore.setValue(getMapTo(schema, mapTo), newValue, prefix)
    FormStore.setValue(PresetAssistantForm.title, {}, prependPrefix(freePresetKey, prefix))
    FormStore.setValue(PresetCameraField.title, newValue, creationPrefix)
    FormStore.setValue(PresetProjectField.title, untypedDbStore.currentlyEditing, creationPrefix)
    const freeId: any = yield DbStore.create(PresetAssistantForm, undefined, prependPrefix(freePresetKey, prefix))
    mapTo = mapTo.substring(0, mapTo.indexOf("]") + 1)
    FormStore.setValue(`${prependPrefix(mapTo, prefix)}.${ShotPreset.title}`, freeId)
    return freeId
  })
}

const emptyArray = (size: number) => {
  const arr: any[] = []
  for (let index = 0; index < size; index++) {
    arr.push(undefined)
  }
  return arr
}

const useCameraChooser = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  let cameras = FormStore.getValue(ProjectCameras.title, prefix)
  cameras = cameras ? cameras : []
  const arr = mapTo.substring(0, mapTo.indexOf("["))
  const pop = FormStore.getValue(arr, prependPrefix(prefix, popupVisibilityKey))
  if (pop == null || pop.length < 600) {
    FormStore.setValue(arr, emptyArray(602), prependPrefix(prefix, popupVisibilityKey))
  }
  return {
    cameras,
    value: FormStore.getValue(getMapTo(schema, mapTo), prefix),
    showPopUp: FormStore.getValue(getMapTo(schema, mapTo), prependPrefix(prefix, popupVisibilityKey), false) === true,
    hidePop: memo(() => togglePop(schema, mapTo, prefix, false), ["hidePop", mapTo, prefix, JSON.stringify(schema)]),
    showPop: memo(() => togglePop(schema, mapTo, prefix, true), ["showPop", mapTo, prefix, JSON.stringify(schema)]),
    setValueWithPreset: memo(() => setValueWithPreset(schema, mapTo, prefix), ["setValueWithPreset", JSON.stringify(schema), mapTo, prefix])
  }
}

export default useCameraChooser
export { togglePop, setValueWithPreset }
