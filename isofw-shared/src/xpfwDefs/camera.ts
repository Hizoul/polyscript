import { addTimeStamp, ExtendedJSONSchema } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { changeValToRegex } from "isofw-shared/src/util/valToRegex"
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
  modify: [addTimeStamp("createdAt", ["create"])]
}

export {
  CameraForm, CameraIp
}
