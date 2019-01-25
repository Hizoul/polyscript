import { FormStore, IArrayProps, IFieldProps } from "@xpfw/form-shared"
import { IField, prefixMaker } from "@xpfw/validate"
import {
  OperatorRelation, ProjectCameras, ProjectOperatorCameraMapping,
  ProjectOperators, ProjectProgram, ShotCamera
} from "isofw-shared/src/xpfwDefs/project"
import { cloneDeep, find, get } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"

const currentOperatorKey = `current${ProjectOperators.mapTo}`

const changeOperator = (thisRef: any) => {
  return (operator: any) => {
    return () => {
      const prefix = prefixMaker(get(thisRef.props, "prefix", ""))
      FormStore.setValue(prefix + currentOperatorKey, operator)
    }
  }
}

export interface WrapperOperatorAndProps {
  item: any
}

export interface SharedOperatorInfoProps extends WrapperOperatorAndProps {
  currentOperator: string
  currentCameras: string[]
  changeOperator: any
  filteredList: any
}
const SharedOperatorInfo: (Container: React.ComponentType<SharedOperatorInfoProps>) =>
React.ComponentType<WrapperOperatorAndProps> = (Container: React.ComponentType<SharedOperatorInfoProps>) => {
  const b: any = class extends ComponentBase<any, any> {
    private changeOperator: any
    constructor(props: any) {
      super(props)
      this.changeOperator = changeOperator(this)
    }
    public render() {
      const item = get(this.props, "original.result", this.props.item)
      const mappings = find(get(item, ProjectOperatorCameraMapping.mapTo, []),
        [OperatorRelation.mapTo, this.state.currentOperator])
      const currentCameras = mappings && mappings[ProjectCameras.mapTo] ? mappings[ProjectCameras.mapTo] : []
      let filteredList = get(item, ProjectProgram.mapTo, [])
      if (currentCameras.length > 0) {
        filteredList = filteredList.filter((item: any) => currentCameras.indexOf(item[ShotCamera.mapTo]) !== -1)
      }
      return (
        <Container
          {...this.props}
          item={item}
          currentOperator={this.state.currentOperator}
          changeOperator={this.changeOperator}
          currentCameras={currentCameras}
          filteredList={filteredList}
        />
      )
    }
    protected _buildState(props: any, initialBuild: boolean): any {
      const prefix = prefixMaker(get(props, "prefix", ""))
      const currentOperator = FormStore.getValue(`${prefix}${currentOperatorKey}`)
      return {
        currentOperator
      }
    }
  }
  return b
}

export default SharedOperatorInfo
export {
  changeOperator
}
