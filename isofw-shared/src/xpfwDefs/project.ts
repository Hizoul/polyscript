import { MailField } from "@xpfw/data"
import { addTimeStamp, ExtendedJSONSchema, executeForMethods } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { cloneDeep } from "lodash"
import { IDField } from "./commonFields"
import { changeValToRegex } from "@xpfw/data"
import { changeValToRegexNedb } from "../util/valToRegex"

const ProjectName: ExtendedJSONSchema = {
  type: "string",
  title: "name"
}

const ProjectShot: ExtendedJSONSchema = {
  type: "number",
  title: "shot"
}

const InstrumentForm: ExtendedJSONSchema = {
  title: "projectModel",
  collection: val.service.instruments,
  type: "object",
  properties: {
    [String(IDField.title)]: IDField,
    [String(ProjectName.title)]: ProjectName
  }
}

const ShotName: ExtendedJSONSchema = {
  type: "string",
  title: "pname"
}

const ShotMovement: ExtendedJSONSchema = {
  type: "string",
  title: "movement"
}

const ShotMovementTowards: ExtendedJSONSchema = {
  type: "string",
  title: "movementTowards"
}

const ShotDuration: ExtendedJSONSchema = {
  type: "number",
  title: "duration"
}

const ShotType: ExtendedJSONSchema = {
  type: "string",
  title: "type"
}

const ShotRemarksDirector: ExtendedJSONSchema = {
  type: "string",
  title: "directorRemarks"
}

const ShotRemarksOperator: ExtendedJSONSchema = {
  type: "string",
  title: "operatorRemarks"
}

const ShotCamera: ExtendedJSONSchema = {
  type: "string",
  title: "camera",
  theme: "program",
  relationship: {
    namePath: ProjectName.title,
    collection: "cameras",
    idPath: "_id"
  }
}

const ShotPreset: ExtendedJSONSchema = {
  type: "string",
  title: "preset",
  theme: "presetNumberDisplay"
}

const ShotNumber: ExtendedJSONSchema = {
  type: "number",
  title: "number"
}

const ShotImportance: ExtendedJSONSchema = {
  type: "string",
  title: "importance",
  theme: "select",
  selectOptions: [
    {label: "Normal", value: "n"},
    {label: "Raised", value: "r"},
    {label: "Maximum", value: "m"}
  ]
}

const ProjectProgram: ExtendedJSONSchema = {
  type: "array",
  title: "program",
  items: {
    type: "object",
    properties: {
      [String(ShotName.title)]: ShotName,
      [String(ShotType.title)]: ShotType,
      [String(ShotMovement.title)]: ShotMovement,
      [String(ShotMovementTowards.title)]: ShotMovementTowards,
      [String(ShotDuration.title)]: ShotDuration,
      [String(ShotRemarksDirector.title)]: ShotRemarksDirector,
      [String(ShotRemarksOperator.title)]: ShotRemarksOperator,
      [String(ShotCamera.title)]: ShotCamera,
      [String(ShotPreset.title)]: ShotPreset,
      [String(ShotImportance.title)]: ShotImportance,
      [String(ShotNumber.title)]: ShotNumber
    }
  },
  hide: {update: true, create: true}
}

const ProjectCameras: ExtendedJSONSchema = {
  type: "array",
  title: "cameras",
  theme: "multi",
  relationship: {
    namePath: ProjectName.title,
    collection: "cameras",
    idPath: "_id"
  },
  items: {type: "string"}
}

const DisabledCameras: ExtendedJSONSchema = cloneDeep(ProjectCameras)
DisabledCameras.title = "disabledCameras"
DisabledCameras.theme = "cameraDisabler"

const ProjectOperators: ExtendedJSONSchema = {
  type: "array",
  title: "operators",
  items: {type: "string"},
  theme: "multi",
  relationship: {
    namePath: MailField.title,
    collection: "users",
    idPath: "_id"
  }
}

const OperatorRelation: ExtendedJSONSchema = {
  type: "string",
  title: "operator",
  theme: "single",
  relationship: {
    namePath: MailField.title,
    collection: "users",
    idPath: "_id"
  }
}

const ProjectOperatorCameraMapping: ExtendedJSONSchema = {
  type: "array",
  title: "operatorCameraMapping",
  theme: "cameraMapping",
  items: {
    type: "object",
    properties: {
      [String(OperatorRelation.title)]: OperatorRelation,
      [String(ProjectCameras.title)]: ProjectCameras
    }
  }
}

const IsActiveField: ExtendedJSONSchema = {
  type: "boolean",
  title: "isActive",
  default: true,
  hide: {create: false, update: false}
}

const ProjectForm: ExtendedJSONSchema = {
  title: "projectModel",
  collection: val.service.project,
  type: "object",
  properties: {
    [String(IDField.title)]: IDField,
    [String(ProjectName.title)]: ProjectName,
    [String(ProjectShot.title)]: ProjectShot,
    [String(ProjectCameras.title)]: ProjectCameras,
    [String(ProjectOperators.title)]: ProjectOperators,
    [String(ProjectOperatorCameraMapping.title)]: ProjectOperatorCameraMapping,
    [String(IsActiveField.title)]: IsActiveField,
    [String(DisabledCameras.title)]: DisabledCameras
  },
  modify: [addTimeStamp("createdAt", ["create"]), (val.useNedb ? changeValToRegexNedb(String(ProjectName.title), ["find"]) : changeValToRegex(String(ProjectName.title), ["find"]))]
}

const StrippedProjectForm: ExtendedJSONSchema = {
  title: "projectModel",
  collection: val.service.project,
  type: "object",
  properties: {
    [String(ProjectName.title)]: ProjectName,
    [String(ProjectShot.title)]: ProjectShot,
    [String(ProjectCameras.title)]: ProjectCameras,
    [String(ProjectOperators.title)]: ProjectOperators,
    [String(ProjectOperatorCameraMapping.title)]: ProjectOperatorCameraMapping
  },
  modify: [addTimeStamp("createdAt", ["create"])]
}

export {
  ProjectForm, ProjectName, ProjectShot, ProjectProgram, ShotCamera, ShotPreset, ShotImportance,
  ProjectOperators, ProjectOperatorCameraMapping, OperatorRelation, ProjectCameras, IsActiveField,
  ShotName, ShotType, ShotMovement, ShotMovementTowards, ShotDuration, ShotRemarksDirector, ShotRemarksOperator,
  DisabledCameras, ShotNumber, StrippedProjectForm, InstrumentForm
}
