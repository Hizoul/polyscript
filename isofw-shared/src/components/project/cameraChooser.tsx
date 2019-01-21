import { IField, prefixMaker } from "@xpfw/validate"
import { cloneDeep, get, findIndex } from "lodash"
import * as React from "react"
import { IArrayProps, FormStore, IFieldProps } from "@xpfw/form-shared";
import { ComponentBase } from "resub";
import { ProjectCameras, ProjectOperators, OperatorRelation } from "isofw-shared/src/xpfwDefs/project"
import { isBoolean } from "lodash";

const popupVisibilityKey = "cameraChoice."

const togglePop = (thisRef: any) => {
  return (newValue?: any) => {
    if (newValue && newValue.type === "popup:closed") {
      newValue = false
    }
    let currentValue = get(thisRef, "state.showPopUp", false)
    let mapTo = get(thisRef, "props.field.mapTo", false)
    const prefix = prefixMaker(get(thisRef.props, "prefix", ""))
    FormStore.setValue(prefix+popupVisibilityKey+mapTo, isBoolean(newValue) ? newValue : !currentValue)
  }
}

export interface SharedCameraChoiceProps extends IFieldProps {
  cameras: string[]
  showPopUp: boolean
  togglePop: any
}

const SharedCameraChoice = (Container: React.ComponentType<SharedCameraChoiceProps>) => {
  return class extends ComponentBase<IFieldProps, any> {
    private togglePop: any
    constructor(props: any) {
      super(props)
      this.togglePop = togglePop(this)
    }
    public render() {
      return (
        <Container
          {...this.props}
          cameras={this.state.cameras}
          showPopUp={this.state.showPopUp}
          togglePop={this.togglePop}
        />
      )
    }
    protected _buildState(props: IFieldProps, initialBuild: boolean): any {
      const prefix = prefixMaker(get(props, "prefix", ""))
      let mapTo = get(props, "field.mapTo", false)
      let cameras = FormStore.getValue(`${prefix}${ProjectCameras.mapTo}`)
      cameras = cameras ? cameras : []
      return {
        cameras,
        showPopUp: FormStore.getValue(`${prefix}${popupVisibilityKey}${mapTo}`)
      }
    }
  }
}

export default SharedCameraChoice
export {togglePop}
