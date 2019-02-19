import {
  ExtendedJSONSchema, FormStore, getMapTo, IFieldProps,
  memo, prependPrefix, useFieldWithValidation
} from "isofw-shared/src/util/xpfwform"
import { OperatorRelation, ProjectCameras, ProjectOperators } from "isofw-shared/src/xpfwDefs/project"
import { cloneDeep, findIndex, get } from "lodash"
import { toJS } from "mobx"
const changeMapping = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  return (operator: string, camera: string) => {
    return (event?: any) => {
      const fieldHelper = useFieldWithValidation(schema, mapTo, prefix)
      let currentArray = fieldHelper.value
      const operatorIndex = findIndex(currentArray, [String(OperatorRelation.title), operator])
      if (operatorIndex === -1) {
        currentArray.push({[String(OperatorRelation.title)]: operator, [String(ProjectCameras.title)]: [camera]})
      } else {
        currentArray = cloneDeep(currentArray)
        const operatorCameras = get(currentArray[operatorIndex], String(ProjectCameras.title), [])
        const cameraIndex = operatorCameras.indexOf(camera)
        if (cameraIndex === -1) {
          operatorCameras.push(camera)
        } else {
          operatorCameras.splice(cameraIndex, 1)
        }
        currentArray[operatorIndex][String(ProjectCameras.title)] = operatorCameras
      }
      fieldHelper.setValue(currentArray)
    }
  }
}
const popupVisibilityKey = "cameraMappingPopup"

const togglePop = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, newValue?: boolean) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo)}
  return (ev?: any) => {
    let valueToSet = newValue
    if (ev && ev.type === "popup:closed") {
      valueToSet = false
    }
    FormStore.setValue(mapTo, valueToSet, prependPrefix(popupVisibilityKey, prefix))
  }
}

export interface CameraMappingUtils {
  value: any
  cameras: string[]
  operators: string[]
  showPopUp: boolean
  changeMapping: (operator: string, camera: string) => () => void
  showPop: () => void
  hidePop: () => void
}

const useCameraMapping = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  const field = useFieldWithValidation(schema, mapTo, prefix)
  let cameras = FormStore.getValue(ProjectCameras.title, prefix)
  cameras = cameras ? cameras : []
  let operators = FormStore.getValue(ProjectOperators.title, prefix)
  operators = operators ? operators : []
  const ret: CameraMappingUtils = {
    value: field.value,
    cameras,
    operators,
    showPopUp: FormStore.getValue(mapTo, prependPrefix(popupVisibilityKey, prefix)),
    changeMapping: memo(() => changeMapping(schema, mapTo, prefix),
      ["changeMapping", mapTo, prefix, JSON.stringify(schema)]),
    hidePop: memo(() => togglePop(schema, mapTo, prefix, false), ["hidePop", mapTo, prefix]),
    showPop: memo(() => togglePop(schema, mapTo, prefix, true), ["showPop", mapTo, prefix])
  }
  return ret
}

export default useCameraMapping
export {
  changeMapping, togglePop
}
