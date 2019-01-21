import ValidationRegistry, { FieldType, IField, IForm, Permission } from "@xpfw/validate"
import IDField from "./idField";

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
  collection: "presets",
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
    idPath: "_id"
  }
}

ValidationRegistry.registerForm(PresetForm)

export {
  PresetForm, PresetNumberField, PresetProjectField, PresetCameraField
}