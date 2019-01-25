import { FormStore, IArrayProps, IFieldProps } from "@xpfw/form-shared"
import { IField, prefixMaker } from "@xpfw/validate"
import {
  OperatorRelation, ProjectCameras, ProjectOperatorCameraMapping,
  ProjectOperators, ProjectProgram, ShotCamera, ShotPreset
} from "isofw-shared/src/xpfwDefs/project"
import { cloneDeep, find, get } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"

const currentOperatorKey = `current${ProjectOperators.mapTo}`

const whichViewIsActiveKey = `operatorInView`

const changeValue = (thisRef: any, keyToUse: string, useThisValue?: any) => {
  return (operator: any) => {
    return () => {
      const prefix = prefixMaker(get(thisRef.props, "prefix", ""))
      FormStore.setValue(prefix + keyToUse, useThisValue != null ? useThisValue : operator)
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
  useScriptView: any
  usePresetView: any
  presetByCamera: any
  filteredList: any
  isPresetView: boolean
}
const SharedOperatorInfo: (Container: React.ComponentType<SharedOperatorInfoProps>) =>
React.ComponentType<WrapperOperatorAndProps> = (Container: React.ComponentType<SharedOperatorInfoProps>) => {
  return class extends ComponentBase<any, any> {
    private changeOperator: any
    private useScriptView: any
    private usePresetView: any
    constructor(props: any) {
      super(props)
      this.changeOperator = changeValue(this, currentOperatorKey)
      this.useScriptView = changeValue(this, whichViewIsActiveKey, 0)
      this.usePresetView = changeValue(this, whichViewIsActiveKey, 1)
    }
    public render() {
      const item = get(this.props, "original.result", this.props.item)
      const mappings = find(get(item, ProjectOperatorCameraMapping.mapTo, []),
        [OperatorRelation.mapTo, this.state.currentOperator])
      const currentCameras = mappings && mappings[ProjectCameras.mapTo] ? mappings[ProjectCameras.mapTo] : []
      let filteredList = get(item, ProjectProgram.mapTo, [])
      const presetByCamera: any = {}
      filteredList.forEach((subItem: any) => {
        if (presetByCamera[subItem[ShotCamera.mapTo]] == null) {
          presetByCamera[subItem[ShotCamera.mapTo]] = []
        }
        presetByCamera[subItem[ShotCamera.mapTo]].push(presetByCamera[subItem[ShotPreset.mapTo]])
      })
      if (currentCameras.length > 0) {
        filteredList = filteredList.filter((subItem: any) => currentCameras.indexOf(subItem[ShotCamera.mapTo]) !== -1)
      }
      return (
        <Container
          {...this.props}
          item={item}
          currentOperator={this.state.currentOperator}
          isPresetView={this.state.isPresetView}
          changeOperator={this.changeOperator}
          useScriptView={this.useScriptView}
          usePresetView={this.usePresetView}
          presetByCamera={presetByCamera}
          currentCameras={currentCameras}
          filteredList={filteredList}
        />
      )
    }
    protected _buildState(props: any, initialBuild: boolean): any {
      const prefix = prefixMaker(get(props, "prefix", ""))
      return {
        currentOperator: FormStore.getValue(`${prefix}${currentOperatorKey}`),
        isPresetView: FormStore.getValue(`${prefix}${whichViewIsActiveKey}`) === 1
      }
    }
  }
}

export default SharedOperatorInfo
export {
  changeValue, currentOperatorKey, whichViewIsActiveKey
}
