import { IField, prefixMaker } from "@xpfw/validate"
import { cloneDeep, get, findIndex } from "lodash"
import * as React from "react"
import { IArrayProps, FormStore } from "@xpfw/form-shared";
import { ComponentBase } from "resub";
import { ProjectCameras, ProjectOperators, OperatorRelation } from "isofw-shared/src/xpfwDefs/project";

const changeMapping = (thisRef: any) => {
  return (operator: string, camera: string) => {
    return () => {
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
const popupVisibilityKey = ""

const togglePop = (thisRef: any) => {
  return () => {
    let currentValue = get(thisRef, "state.showPopUp", false)
    const prefix = prefixMaker(get(thisRef.props, "prefix", ""))
    FormStore.setValue(prefix+popupVisibilityKey, !currentValue)
  }
}

export interface SharedCameraMappingProps extends IArrayProps {
  cameras: string[]
  operators: string[]
  showPopUp: boolean
  changeMapping: (operator: string, camera: string) => void
  togglePop: () => void
}

const SharedCameraMapping = (Container: React.ComponentType<SharedCameraMappingProps>) => {
  return class extends ComponentBase<IArrayProps, any> {
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
    protected _buildState(props: IArrayProps, initialBuild: boolean): any {
      const prefix = prefixMaker(get(props, "prefix", ""))
      return {
        cameras: FormStore.getValue(`${prefix}${ProjectCameras.mapTo}`),
        operators: FormStore.getValue(`${prefix}${ProjectOperators.mapTo}`),
        showPopUp: FormStore.getValue(`${prefix}${popupVisibilityKey}`)
      }
    }
  }
}

export default SharedCameraMapping
export {
  changeMapping, togglePop
}
