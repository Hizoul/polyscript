import { ExtendedJSONSchema } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { cloneDeep } from "lodash"
import { IDField } from "./commonFields"

const EMPTY_PRESET = "-"

const PresetNumberField: ExtendedJSONSchema = {
  type: "number",
  title: "number"
}

const PresetProjectField: ExtendedJSONSchema = {
  type: "string",
  title: "project"
}

const PresetCameraField: ExtendedJSONSchema = {
  type: "string",
  title: "camera"
}
const PresetActionTypeField: ExtendedJSONSchema = {
  type: "number",
  title: "type"
}

const PresetIsReadyField: ExtendedJSONSchema = {
  type: "boolean",
  title: "isReady",
  hide: {create: false},
  default: false
}

const PresetForm: ExtendedJSONSchema = {
  title: "presetModel",
  collection: val.service.preset,
  type: "object",
  properties: {
    [String(IDField.title)]: IDField,
    [String(PresetNumberField.title)]: PresetNumberField,
    [String(PresetProjectField.title)]: PresetProjectField,
    [String(PresetCameraField.title)]: PresetCameraField,
    [String(PresetIsReadyField.title)]: PresetIsReadyField,
    [String(PresetActionTypeField.title)]: PresetActionTypeField
  },
  modify: {
    addCreatedAt: true,
    defaultSort: {
      [String(PresetCameraField.title)]: 1,
      [String(PresetNumberField.title)]: 1
    }
  }
}

const PresetAssistantForm: ExtendedJSONSchema = cloneDeep(PresetForm)
PresetAssistantForm.collection = val.service.presetAssistant

export {
  PresetForm, PresetNumberField, PresetProjectField, PresetCameraField, EMPTY_PRESET, PresetAssistantForm,
  PresetIsReadyField, PresetActionTypeField
}
