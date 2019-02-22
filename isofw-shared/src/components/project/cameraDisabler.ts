import {
  ExtendedJSONSchema, FormStore, getMapTo, IFieldProps,
  memo, prependPrefix, useFieldWithValidation
} from "isofw-shared/src/util/xpfwform"
import { OperatorRelation, ProjectCameras, ProjectOperatorCameraMapping, ProjectOperators } from "isofw-shared/src/xpfwDefs/project"
import { cloneDeep, findIndex, get } from "lodash"
import { action } from "mobx"

const toggleCamera = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, camera?: string) => {
  return action((event?: any) => {
    const fieldHelper = useFieldWithValidation(schema, mapTo, prefix)
    let currentArray = fieldHelper.value
    if (currentArray == null) {
      currentArray = []
    }
    const cameraIndex = currentArray.indexOf(camera)
    if (cameraIndex === -1) {
      currentArray.push(camera)
    } else {
      currentArray.splice(cameraIndex, 1)
    }
    fieldHelper.setValue(currentArray)
  })
}
const toggleOperator = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string, operator?: string) => {
  return action((event?: any) => {
    const fieldHelper = useFieldWithValidation(schema, mapTo, prefix)
    let currentArray = fieldHelper.value
    if (currentArray == null) {
      currentArray = []
    }
    const operatorCameraMapping = FormStore.getValue(String(ProjectOperatorCameraMapping.title), prefix, [])
    for (const entry of operatorCameraMapping) {
      const operatorId = entry[String(OperatorRelation.title)]
      if (operatorId === operator) {
        let hasActiveCamera = false
        for (const cameraId of entry[String(ProjectCameras.title)]) {
          if (currentArray.indexOf(cameraId) === -1) {
            hasActiveCamera = true
          }
        }
        for (const cameraId of entry[String(ProjectCameras.title)]) {
          const cameraIndex = currentArray.indexOf(cameraId)
          if (hasActiveCamera && cameraIndex === -1) {
            currentArray.push(cameraId)
          } else if (!hasActiveCamera && cameraIndex !== -1) {
            currentArray.splice(cameraIndex, 1)
          }
        }
      }
    }
  })
}

export interface CameraDisablerUtils {
  value: any
  operatorCameraMapping: any[]
  cameraToggles: any
  operatorToggles: any
  isActive: any
}

const useCameraDisabler = (schema: ExtendedJSONSchema, mapTo?: string, prefix?: string) => {
  if (mapTo == null) { mapTo = getMapTo(schema, mapTo) }
  const field = useFieldWithValidation(schema, mapTo, prefix)
  let value = field.value
  if (value == null) {
    value = []
  }
  const operatorCameraMapping = FormStore.getValue(String(ProjectOperatorCameraMapping.title), prefix, [])
  const cameraToggles: any = {}
  const operatorToggles: any = {}
  const isActive: any = {}
  for (const entry of operatorCameraMapping) {
    const operatorId = entry[String(OperatorRelation.title)]
    operatorToggles[operatorId] = memo(() => toggleOperator(schema, mapTo, prefix, operatorId),
      ["toggleOperator", mapTo, prefix, operatorId])
    let hasActiveCamera = false
    for (const cameraId of entry[String(ProjectCameras.title)]) {
      cameraToggles[cameraId] = memo(() => toggleCamera(schema, mapTo, prefix, cameraId),
        ["toggleCamera", mapTo, prefix, operatorId])
      isActive[cameraId] = value.indexOf(cameraId) === -1
      if (isActive[cameraId] === true) {
        hasActiveCamera = true
      }
    }
    isActive[operatorId] = hasActiveCamera
  }
  const ret: CameraDisablerUtils = {
    value,
    operatorCameraMapping,
    isActive,
    cameraToggles,
    operatorToggles
  }
  return ret
}

export default useCameraDisabler
export {
  toggleCamera, toggleOperator
}
