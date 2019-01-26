import { FormStore } from "@xpfw/form-shared"
import { DbStore, IFormShowProps, SharedFormShow } from "@xpfw/ui-shared"
import { prefixMaker } from "@xpfw/validate"
import val from "isofw-shared/src/globals/val"
import { PresetForm, PresetIsReadyField } from "isofw-shared/src/xpfwDefs/preset"
import { get } from "lodash"
import * as React from "react"
import { ComponentBase } from "resub"

export interface PresetUpdaterState {
  item: any
}

export interface PresetUpdaterProps extends PresetUpdaterState {
  setReady: any
  setNotReady: any
  isReady: boolean
}
const updatePrefix = "presetUpdater"

const updatePreset = (thisref: any, newValue: any) => {
  return async () => {
    FormStore.resetForm(PresetForm, updatePrefix)
    FormStore.setValue(`${prefixMaker(updatePrefix)}${PresetIsReadyField.mapTo}`, newValue)
    const updateRes = await DbStore.patch(thisref.props.id, PresetForm, updatePrefix)
    return updateRes
  }
}

const sharedPresetUpdater = (Container: React.ComponentType<PresetUpdaterProps>) => {
  return class extends ComponentBase<any, PresetUpdaterState> {
    private setReady: any
    private setNotReady: any
    constructor(props: any) {
      super(props)
      this.setReady = updatePreset(this, true)
      this.setNotReady = updatePreset(this, false)
    }
    public render() {
      return (
        <Container
          {...this.props}
          {...this.state}
          setReady={this.setReady}
          setNotReady={this.setNotReady}
          isReady={get(this.state.item, PresetIsReadyField.mapTo, false)}
        />
      )
    }
    protected _buildState(props: any, initialBuild: boolean): PresetUpdaterState {
      const item = get(DbStore.getGetState(props.id, val.service.preset, true), "result")
      return {
        item
      }
    }
  }
}

export default sharedPresetUpdater
export {
  updatePreset
}
