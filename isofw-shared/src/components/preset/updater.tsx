import { DbStore } from "@xpfw/data"
import { FormStore, memo, useField } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { PresetForm, PresetIsReadyField } from "isofw-shared/src/xpfwDefs/preset"
import { get } from "lodash"
import * as React from "react"

const updatePrefix = "presetUpdater"
const presetFormHelper = useField(String(PresetForm.title), updatePrefix)
const presetIsReadyHelper = useField(String(PresetIsReadyField.title), updatePrefix)

const updatePreset = (presetId: string, isReady: boolean) => {
  return async () => {
    presetFormHelper.setValue({})
    presetIsReadyHelper.setValue(isReady)
    const updateRes = await DbStore.patch(presetId, PresetForm, updatePrefix)
    return updateRes
  }
}

const usePresetUpdater = (id: string) => {
  const item = DbStore.getGetState(id, val.service.preset, true)
  return {
    item,
    isReady: get(item, String(PresetIsReadyField.title), false),
    setReady: memo(() => updatePreset(id, true), [updatePrefix, id, true]),
    setNotReady: memo(() => updatePreset(id, false), [updatePrefix, id, false])
  }
}

export interface IPresetUpdaterProps {id: string}

const usePresetUpdaterWithProps = (props: IPresetUpdaterProps) => usePresetUpdater(props.id)

export default usePresetUpdater
export {
  updatePreset, usePresetUpdaterWithProps
}
