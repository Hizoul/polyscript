import ValidationRegistry, { FieldType, IField, IForm, Permission } from "@xpfw/validate"
import val from "isofw-shared/src/globals/val"
import { cloneDeep } from "lodash"
import { IDField } from "./commonFields"

const EMPTY_PRESET = "-"

const PresetNumberField: IField = {
  type: FieldType.Number,
  mapTo: "number"
}

const PresetProjectField: IField = {
  type: FieldType.Text,
  mapTo: "project"
}

const PresetCameraField: IField = {
  type: FieldType.Text,
  mapTo: "camera"
}

const PresetForm: IForm = {
  model: "presetModel",
  collection: val.service.preset,
  sections: [{fields: [
    IDField, PresetNumberField, PresetProjectField, PresetCameraField
  ]}],
  permissions: {
    required: {
      create: Permission.User,
      find: Permission.User,
      get: Permission.User,
      update: Permission.User,
      remove: Permission.User
    }
  },
  options: {
    addCreatedAt: true,
    idPath: "_id",
    defaultSort: {
      [PresetCameraField.mapTo]: 1,
      [PresetNumberField.mapTo]: 1
    }
  }
}

ValidationRegistry.registerForm(PresetForm)

const PresetAssistantForm: IForm = cloneDeep(PresetForm)
PresetAssistantForm.collection = val.service.presetAssistant
ValidationRegistry.registerForm(PresetAssistantForm)

export {
  PresetForm, PresetNumberField, PresetProjectField, PresetCameraField, EMPTY_PRESET, PresetAssistantForm
}
