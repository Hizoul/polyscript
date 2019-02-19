import { ExtendedJSONSchema } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { IDField } from "./commonFields"
import { ProjectName } from "./project"

const CameraIp: ExtendedJSONSchema = {
  type: "string",
  title: "ip"
}

const CameraForm: ExtendedJSONSchema = {
  title: "cameraModel",
  collection: val.service.camera,
  type: "object",
  properties: {
    [String(IDField.title)]: IDField,
    [String(ProjectName.title)]: ProjectName,
    [String(CameraIp.title)]: CameraIp
  },
  modify: {
    addCreatedAt: true
  }
}

export {
  CameraForm, CameraIp
}
