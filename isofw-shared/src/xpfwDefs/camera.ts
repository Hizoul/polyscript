import { changeValToRegex } from "@xpfw/data"
import { addTimeStamp,  ExtendedJSONSchema } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { ProjectName } from "./project"
import { changeValToRegexNedb } from "isofw-shared/src/util/valToRegex"

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
  modify: [(val.useNedb ? changeValToRegexNedb(String(ProjectName.title), ["find"]) : changeValToRegex(String(ProjectName.title), ["find"])), addTimeStamp("createdAt", ["create"])]
}

export {
  CameraForm, CameraIp
}
