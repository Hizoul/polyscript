import { addTimeStamp, ExtendedJSONSchema } from "@xpfw/form"
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

const PresetPanField: ExtendedJSONSchema = {
  type: "string",
  title: "pan"
}

const PresetTiltField: ExtendedJSONSchema = {
  type: "string",
  title: "tilt"
}

const PresetZoomField: ExtendedJSONSchema = {
  type: "string",
  title: "zoom"
}

const PresetFocusField: ExtendedJSONSchema = {
  type: "string",
  title: "focus"
}

const PresetIrisField: ExtendedJSONSchema = {
  type: "string",
  title: "iris"
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
    [String(PresetActionTypeField.title)]: PresetActionTypeField,
    [String(PresetPanField.title)]: PresetPanField,
    [String(PresetTiltField.title)]: PresetTiltField,
    [String(PresetZoomField.title)]: PresetZoomField,
    [String(PresetFocusField.title)]: PresetFocusField,
    [String(PresetIrisField.title)]: PresetIrisField
  },
  modify: [addTimeStamp("createdAt", ["create"])]
}

const PresetAssistantForm: ExtendedJSONSchema = cloneDeep(PresetForm)
PresetAssistantForm.title = "assistantForm"
PresetAssistantForm.collection = val.service.presetAssistant

export {
  PresetForm, PresetNumberField, PresetProjectField, PresetCameraField, EMPTY_PRESET, PresetAssistantForm,
  PresetIsReadyField, PresetActionTypeField, PresetPanField, PresetTiltField, PresetZoomField,
  PresetFocusField, PresetIrisField
}
