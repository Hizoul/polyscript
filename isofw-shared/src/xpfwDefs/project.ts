import ValidationRegistry, { IForm, Permission, IField, FieldType } from "@xpfw/validate"
import val from "isofw-shared/src/globals/val"
import IDField from "./idField"

const ProjectName: IField = {
  type: FieldType.Text,
  mapTo: "name"
}

const ProjectShot: IField = {
  type: FieldType.Number,
  mapTo: "shot"
}

const ProjectForm: IForm = {
  model: "projectModel",
  collection: val.service.project,
  sections: [{fields: [
    IDField, ProjectName, ProjectShot
  ]}],
  permissions: {
    required: {
      create: Permission.User,
      find: Permission.User,
      get: Permission.User,
      update: Permission.User,
      remove: Permission.Server
    }
  },
  options: {
    addCreatedAt: true,
    idPath: "_id"
  }
}

ValidationRegistry.registerForm(ProjectForm)
export {
  ProjectForm, ProjectName, ProjectShot
}