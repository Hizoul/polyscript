import ValidationRegistry, { IForm, Permission } from "@xpfw/validate"

const ProjectForm: IForm = {
  model: "projectModel",
  collection: "projects",
  sections: [{fields: [
    
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
  ProjectForm
}