import ValidationRegistry, { IForm, Permission, IField, FieldType } from "@xpfw/validate"

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
  collection: "projects",
  sections: [{fields: [
    ProjectName, ProjectShot
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