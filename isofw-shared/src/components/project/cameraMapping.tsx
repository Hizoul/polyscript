import {
  ExtendedJSONSchema, FormStore, getMapTo, IFieldProps,
  memo, prependPrefix, useFieldWithValidation
} from "isofw-shared/src/util/xpfwform"
import { OperatorRelation, ProjectCameras, ProjectOperators } from "isofw-shared/src/xpfwDefs/project"
import { cloneDeep, findIndex, get } from "lodash"

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

const togglePop = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo)}
  return (newValue?: any) => {
    if (newValue && newValue.type === "popup:closed") {
      newValue = false
    }
    FormStore.setValue(mapTo, newValue, prependPrefix(prefix, popupVisibilityKey))
  }
}

export interface SharedCameraMappingProps extends IFieldProps {
  cameras: string[]
  operators: string[]
  showPopUp: boolean
  changeMapping: (operator: string, camera: string) => () => void
  togglePop: () => void
}

const useCameraMapping = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  let cameras = FormStore.getValue(ProjectCameras.title, prefix)
  cameras = cameras ? cameras : []
  let operators = FormStore.getValue(ProjectOperators.title, prefix)
  operators = operators ? operators : []
  return {
    cameras,
    operators,
    showPopUp: FormStore.getValue(`${prefix}${popupVisibilityKey}`),
    changeMapping: memo(() => changeMapping(schema, mapTo, prefix),
      ["changeMapping", mapTo, prefix, JSON.stringify(schema)]),
    hidePop: memo(() => togglePop(schema, mapTo, prefix)(0), ["hidePop", mapTo, prefix]),
    showPop: memo(() => togglePop(schema, mapTo, prefix)(1), ["showPop", mapTo, prefix])
  }
}

export default useCameraMapping
export {
  changeMapping, togglePop
}
