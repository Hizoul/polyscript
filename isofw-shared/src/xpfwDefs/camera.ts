import { ExtendedJSONSchema } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { cloneDeep } from "lodash"
import { changeValToRegex } from "../util/valToRegex"
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
    [String(ProjectName.title)]: ProjectName,
    [String(CameraIp.title)]: CameraIp
  },
  modify: {
    addCreatedAt: true,
    queryModifier: changeValToRegex(String(ProjectName.title))
  }
}

export {
  CameraForm, CameraIp
}
