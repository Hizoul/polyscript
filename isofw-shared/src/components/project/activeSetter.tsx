import { FormStore, IArrayProps, IFieldProps, LoadingStore } from "@xpfw/form-shared"
import { DbStore, IFormShowProps, SharedFormShow } from "@xpfw/ui-shared"
import { IField, prefixMaker } from "@xpfw/validate"
import val from "isofw-shared/src/globals/val"
import { PresetAssistantForm, PresetCameraField, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { IsActiveField, ProjectCameras, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { cloneDeep, get, isBoolean } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"

const toggleActive = (thisRef: any) => {
  return async (newValue?: any) => {
    await DbStore.getFromServer(thisRef.props.id, val.service.presetAssistant)
  }
}

export interface SharedActiveSetterProps extends IFormShowProps {
  toggleActive: any
  isActive: boolean
}

const SharedActiveSetter = (Container: React.ComponentType<SharedActiveSetterProps>) => {
  class ActiveSetterSub extends React.Component<IFormShowProps, any> {
    private toggleActive: any
    constructor(props: any) {
      super(props)
      this.toggleActive = toggleActive(this)
    }
    public render() {
      return (
        <Container
          {...this.props}
          toggleActive={this.toggleActive}
          isActive={get(this.props.item, IsActiveField.mapTo, false)}
        />
      )
    }
  }
  return SharedFormShow(ActiveSetterSub)
}

export default SharedActiveSetter
export { toggleActive }
