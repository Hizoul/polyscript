import { MailField, OwnerField, PwField } from "@xpfw/ui-shared"
import ValidationRegistry, { FieldType, IField, IForm, Permission } from "@xpfw/validate"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { ProjectName } from "./project";

const CameraIp: IField = {
  type: FieldType.Text,
  mapTo: "ip"
}

const CameraForm: IForm = {
  model: "cameraModel",
  collection: "cameras",
  sections: [{fields: [
    ProjectName, CameraIp
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

ValidationRegistry.registerForm(CameraForm)

export {
  CameraForm, CameraIp
}