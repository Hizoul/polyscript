import { MailField, OwnerField, PwField } from "@xpfw/ui-shared"
import ValidationRegistry, { FieldType, IField, IForm, Permission } from "@xpfw/validate"
import collections from "isofw-shared/src/xpfwDefs/collections"

const UserForm: IForm = {
  model: "userModel",
  collection: "users",
  sections: [{fields: [
    MailField, PwField
  ]}],
  permissions: {
    required: {
      create: Permission.Server,
      find: Permission.User,
      get: Permission.User,
      update: Permission.Server,
      remove: Permission.Server
    },
    requireOwner: OwnerField.mapTo
  },
  options: {
    addBelongsTo: true,
    addCreatedAt: true,
    idPath: "_id"
  }
}

ValidationRegistry.registerForm(UserForm)
