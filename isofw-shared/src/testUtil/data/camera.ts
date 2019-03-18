import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"

const testCameras = [
  {_id: "c1bbbbbbbbbbbbbbbbbbbbbb", [String(ProjectName.title)]: "Camera#1", [String(CameraIp.title)]: "localhost:4202/c1"},
  {_id: "c2bbbbbbbbbbbbbbbbbbbbbb", [String(ProjectName.title)]: "Camera#2", [String(CameraIp.title)]: "localhost:4202/c2"},
  {_id: "c3bbbbbbbbbbbbbbbbbbbbbb", [String(ProjectName.title)]: "Camera#3", [String(CameraIp.title)]: "localhost:4202/c3"}
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
