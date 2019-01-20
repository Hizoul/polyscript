import { IField, prefixMaker } from "@xpfw/validate"
import { cloneDeep, get, find } from "lodash"
import * as React from "react"
import { IArrayProps, FormStore, IFieldProps } from "@xpfw/form-shared";
import { ComponentBase } from "resub";
import { ProjectProgram, ProjectCameras, ProjectOperators, OperatorRelation, ShotCamera, ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project";

const currentOperatorKey = `current${ProjectOperators.mapTo}`

const changeOperator = (thisRef: any) => {
  return (operator: any) => {
    return () => {
      const prefix = prefixMaker(get(thisRef.props, "prefix", ""))
      FormStore.setValue(prefix+currentOperatorKey, operator)
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
const SharedOperatorInfo: (Container: React.ComponentType<SharedOperatorInfoProps>) => React.ComponentType<WrapperOperatorAndProps> = (Container: React.ComponentType<SharedOperatorInfoProps>) => {
  const b: any = class extends ComponentBase<any, any> {
    private changeOperator: any
    constructor(props: any) {
      super(props)
      this.changeOperator = changeOperator(this)
    }
    public render() {
      const mappings = find(get(this.props.item, ProjectOperatorCameraMapping.mapTo, []), [OperatorRelation.mapTo, this.state.currentOperator])
      let currentCameras = mappings && mappings[ProjectCameras.mapTo] ? mappings[ProjectCameras.mapTo] : []
      let filteredList = get(this.props.item, ProjectProgram.mapTo, []).filter((item: any) => currentCameras.indexOf(item[ShotCamera.mapTo]))
      return (
        <Container
          {...this.props}
          item={this.props.item}
          currentOperator={this.state.currentOperator}
          changeOperator={this.changeOperator}
          currentCameras={currentCameras}
          filteredList={filteredList}
        />
      )
    }
    protected _buildState(props: any, initialBuild: boolean): any {
      const prefix = prefixMaker(get(props, "prefix", ""))
      let currentOperator = FormStore.getValue(`${prefix}${currentOperatorKey}`)
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
