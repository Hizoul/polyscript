import { FormStore, IArrayProps, IFieldProps } from "@xpfw/form-shared"
import { DbStore } from "@xpfw/ui-shared"
import { IField, prefixMaker } from "@xpfw/validate"
import { PresetAssistantForm, PresetCameraField, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectCameras, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { cloneDeep, get, isBoolean } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"

const popupVisibilityKey = "cameraChoice."

const togglePop = (thisRef: any) => {
  return (newValue?: any) => {
    if (newValue && newValue.type === "popup:closed") {
      newValue = false
    }
    const currentValue = get(thisRef, "state.showPopUp", false)
    const mapTo = get(thisRef, "props.field.mapTo", false)
    const prefix = prefixMaker(get(thisRef.props, "prefix", ""))
    FormStore.setValue(prefix + popupVisibilityKey + mapTo, isBoolean(newValue) ? newValue : !currentValue)
  }
}
const untypedDbStore: any = DbStore
const indexRegularExpression = /.*?\[(.*?)\].*?/g

const setValueWithPreset = (thisRef: any) => {
  return async (newValue?: any) => {
    const prefix = get(thisRef.props, "prefix", "")
    const creationPrefix = prefix + "freePresetGetter"
    thisRef.props.setValue(newValue)
    FormStore.setValue(`${prefixMaker(creationPrefix)}${PresetCameraField.mapTo}`, newValue)
    FormStore.setValue(`${prefixMaker(creationPrefix)}${PresetProjectField.mapTo}`, untypedDbStore.currentlyEditing)
    const freeId: any = await DbStore.create(PresetAssistantForm, creationPrefix)
    let mapTo = get(thisRef.props, "field.mapTo", "")
    mapTo = mapTo.substring(0, mapTo.indexOf("]") + 1)
    FormStore.setValue(`${prefixMaker(prefix)}${mapTo}.${ShotPreset.mapTo}`, freeId.result)
    return freeId.result
  }
}

export interface SharedCameraChoiceProps extends IFieldProps {
  cameras: string[]
  showPopUp: boolean
  togglePop: any
  setValueWithPreset: any
}

const SharedCameraChoice = (Container: React.ComponentType<SharedCameraChoiceProps>) => {
  return class extends ComponentBase<IFieldProps, any> {
    private togglePop: any
    private setValueWithPreset: any
    constructor(props: any) {
      super(props)
      this.togglePop = togglePop(this)
      this.setValueWithPreset = setValueWithPreset(this)
    }
    public render() {
      return (
        <Container
          {...this.props}
          cameras={this.state.cameras}
          showPopUp={this.state.showPopUp}
          togglePop={this.togglePop}
          setValueWithPreset={this.setValueWithPreset}
        />
      )
    }
    protected _buildState(props: IFieldProps, initialBuild: boolean): any {
      const prefix = prefixMaker(get(props, "prefix", ""))
      const mapTo = get(props, "field.mapTo", false)
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
export { togglePop, setValueWithPreset }
