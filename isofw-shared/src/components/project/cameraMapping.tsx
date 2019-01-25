import { FormStore, IArrayProps, IFieldProps } from "@xpfw/form-shared"
import { IField, prefixMaker } from "@xpfw/validate"
import { OperatorRelation, ProjectCameras, ProjectOperators } from "isofw-shared/src/xpfwDefs/project"
import { cloneDeep, findIndex, get } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"

const changeMapping = (thisRef: any) => {
  return (operator: string, camera: string) => {
    return (event?: any) => {
      let currentArray = get(thisRef, "props.value", [])
      const operatorIndex = findIndex(currentArray, [OperatorRelation.mapTo, operator])
      if (operatorIndex === -1) {
        currentArray.push({[OperatorRelation.mapTo]: operator, [ProjectCameras.mapTo]: [camera]})
      } else {
        currentArray = cloneDeep(currentArray)
        const operatorCameras = get(currentArray[operatorIndex], ProjectCameras.mapTo, [])
        const cameraIndex = operatorCameras.indexOf(camera)
        if (cameraIndex === -1) {
          operatorCameras.push(camera)
        } else {
          operatorCameras.splice(cameraIndex, 1)
        }
        currentArray[operatorIndex][ProjectCameras.mapTo] = operatorCameras
      }
      thisRef.props.setValue(currentArray)
    }
  }
}
const popupVisibilityKey = "cameraMappingPopup"

const togglePop = (thisRef: any) => {
  return () => {
    const currentValue = get(thisRef, "state.showPopUp", false)
    const prefix = prefixMaker(get(thisRef.props, "prefix", ""))
    FormStore.setValue(prefix + popupVisibilityKey, !currentValue)
  }
}

export interface SharedCameraMappingProps extends IFieldProps {
  cameras: string[]
  operators: string[]
  showPopUp: boolean
  changeMapping: (operator: string, camera: string) => () => void
  togglePop: () => void
}

const SharedCameraMapping = (Container: React.ComponentType<SharedCameraMappingProps>) => {
  return class extends ComponentBase<IFieldProps, any> {
    private changeMapping: any
    private togglePop: any
    constructor(props: any) {
      super(props)
      this.changeMapping = changeMapping(this)
      this.togglePop = togglePop(this)
    }
    public render() {
      return (
        <Container
          {...this.props}
          cameras={this.state.cameras}
          operators={this.state.operators}
          showPopUp={this.state.showPopUp}
          changeMapping={this.changeMapping}
          togglePop={this.togglePop}
        />
      )
    }
    protected _buildState(props: IFieldProps, initialBuild: boolean): any {
      const prefix = prefixMaker(get(props, "prefix", ""))
      let cameras = FormStore.getValue(`${prefix}${ProjectCameras.mapTo}`)
      cameras = cameras ? cameras : []
      let operators = FormStore.getValue(`${prefix}${ProjectOperators.mapTo}`)
      operators = operators ? operators : []
      return {
        cameras,
        operators,
        showPopUp: FormStore.getValue(`${prefix}${popupVisibilityKey}`)
      }
    }
  }
}

export default SharedCameraMapping
export {
  changeMapping, togglePop
}
