import { MailField, OwnerField, PwField } from "@xpfw/ui-shared"
import ValidationRegistry, { FieldType, IField, IForm, Permission } from "@xpfw/validate"
import collections from "isofw-shared/src/xpfwDefs/collections"
import { ProjectName } from "./project";
import IDField from "./idField";
import val from "isofw-shared/src/globals/val"

const CameraIp: IField = {
  type: FieldType.Text,
  mapTo: "ip"
}

const CameraForm: IForm = {
  model: "cameraModel",
  collection: val.service.camera,
  sections: [{fields: [
    IDField, ProjectName, CameraIp
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