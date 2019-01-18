import { IField, prefixMaker } from "@xpfw/validate"
import { cloneDeep, get, isNumber } from "lodash"
import * as React from "react"
import { IArrayProps, FormStore } from "@xpfw/form-shared";
import { ComponentBase } from "resub";
import { ProjectCameras, ProjectOperators } from "isofw-shared/src/xpfwDefs/project";

const removeItem = (thisRef: any) => {
  return (index: any) => {
    return () => {
      let currentArray = get(thisRef, "props.value", [])
      currentArray = cloneDeep(currentArray)
      currentArray.splice(index, 1)
      thisRef.props.setValue(currentArray)
    }
  }
}

export interface SharedCameraMappingProps extends IArrayProps {
  cameras: string[]
  operators: string[]
}

const SharedCameraMapping = (Container: React.ComponentType<SharedCameraMappingProps>) => {
  return class extends ComponentBase<IArrayProps, any> {
    constructor(props: any) {
      super(props)
    }
    public render() {
      return (
        <Container
          {...this.props}
          cameras={this.state.cameras}
          operators={this.state.operators}
        />
      )
    }
    protected _buildState(props: IArrayProps, initialBuild: boolean): any {
      const prefix = prefixMaker(get(props, "prefix", ""))
      return {
        cameras: FormStore.getValue(`${prefix}${ProjectCameras.mapTo}`),
        operators: FormStore.getValue(`${prefix}${ProjectOperators.mapTo}`),
      }
    }
  }
}

export default SharedCameraMapping
export {
}
