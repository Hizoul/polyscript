import ValidationRegistry, { IForm, Permission, IField, FieldType } from "@xpfw/validate"
import val from "isofw-shared/src/globals/val"
import IDField from "./idField"
import { MailField } from "@xpfw/ui-shared"

const convertTextToMongoRegex: any = (value: any) => {
  if (value == null || value.length === 0) {
    return null
  }
  return {
      $regex: `(.*?)${value}(.*?)`,
      $options: "isg"
  }
}

const ProjectName: IField = {
  type: FieldType.Text,
  mapTo: "name",
  validate: {
    convert: {
      find: convertTextToMongoRegex
    }
  }
}

const ProjectShot: IField = {
  type: FieldType.Number,
  mapTo: "shot"
}

const ShotName: IField = {
  type: FieldType.Text,
  mapTo: "pname"
}

const ShotMovement: IField = {
  type: FieldType.Text,
  mapTo: "movement"
}

const ShotMovementTowards: IField = {
  type: FieldType.Text,
  mapTo: "movementTowards"
}

const ShotDuration: IField = {
  type: FieldType.Number,
  mapTo: "duration"
}

const ShotType: IField = {
  type: FieldType.Text,
  mapTo: "type"
}

const ShotRemarksDirector: IField = {
  type: FieldType.Text,
  mapTo: "directorRemarks"
}

const ShotRemarksOperator: IField = {
  type: FieldType.Text,
  mapTo: "operatorRemarks"
}

const ShotCamera: IField = {
  type: FieldType.RelationshipSingle,
  mapTo: "camera",
  theme: "program",
  validate: {
    relationshipNamePath: ProjectName.mapTo,
    relationshipCollection: "cameras",
    relationshipIdPath: "_id"
  }
}

const ShotPreset: IField = {
  type: FieldType.RelationshipSingle,
  mapTo: "preset",
  theme: "presetNumberDisplay"
}

const ProjectProgram: IField = {
  type: FieldType.Array,
  mapTo: "program",
  validate: {
    type: FieldType.Object,
    validate: {objectDef: [
      ShotName, ShotType, ShotMovement, ShotMovementTowards, ShotDuration, ShotRemarksDirector, ShotRemarksOperator, ShotCamera, ShotPreset
    ]},
    hide: {update: true, create: true}
  }
}

const ProjectCameras: IField = {
  type: FieldType.RelationshipMulti,
  mapTo: "cameras",
  validate: {
    relationshipNamePath: ProjectName.mapTo,
    relationshipCollection: "cameras",
    relationshipIdPath: "_id"
  }
}

const ProjectOperators: IField = {
  type: FieldType.RelationshipMulti,
  mapTo: "operators",
  validate: {
    relationshipNamePath: MailField.mapTo,
    relationshipCollection: "users",
    relationshipIdPath: "_id"
  }
}

const OperatorRelation: IField = {
  type: FieldType.RelationshipSingle,
  mapTo: "operator",
  validate: {
    relationshipNamePath: MailField.mapTo,
    relationshipCollection: "users",
    relationshipIdPath: "_id"
  }
}

const ProjectOperatorCameraMapping: IField = {
  type: FieldType.Array,
  mapTo: "operatorCameraMapping",
  theme: "cameraMapping",
  validate: {
    type: FieldType.Object,
    validate: {objectDef: [
      OperatorRelation, ProjectCameras
    ]}
  }
}

const ProjectForm: IForm = {
  model: "projectModel",
  collection: val.service.project,
  sections: [{fields: [
    IDField, ProjectName, ProjectShot, ProjectCameras, ProjectOperators, ProjectOperatorCameraMapping, ProjectProgram
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
  ProjectForm, ProjectName, ProjectShot, ProjectProgram, ShotCamera, ShotPreset,
  ProjectOperators, ProjectOperatorCameraMapping, OperatorRelation, ProjectCameras,
  ShotName, ShotType, ShotMovement, ShotMovementTowards, ShotDuration, ShotRemarksDirector, ShotRemarksOperator
}