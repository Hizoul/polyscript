import { MailField, PwField } from "@xpfw/ui-shared"
import val from "isofw-shared/src/globals/val"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project";
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera";

const testCameras = [
  {_id: "c19999999999999999999999", [ProjectName.mapTo]: "Camera#1", [CameraIp.mapTo]: "localhost:4202/c1"},
  {_id: "c29999999999999999999999", [ProjectName.mapTo]: "Camera#2", [CameraIp.mapTo]: "localhost:4202/c2"},
  {_id: "c39999999999999999999999", [ProjectName.mapTo]: "Camera#3", [CameraIp.mapTo]: "localhost:4202/c3"}
]
8
const createTestCameras = async (app: any) => {
  const newCameras = []
  for (const newUser of testCameras) {
    newCameras.push(await app.service(val.service.camera).create(newUser, isServerParams))    
  }
  return newCameras
}

export default createTestCameras
export {
  testCameras
}