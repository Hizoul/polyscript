import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import getCameraMock from "../../../../isofw-node/src/testUtil/getCameraMock";

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

const mockCameras = async (app: any) => {
  const mockedCameras = []
  for (const camera of testCameras) {
    const cameraMock = await getCameraMock()
    await app.service(val.service.camera).patch(
      camera._id, {[String(CameraIp.title)]: `http://localhost:${cameraMock.port}`})
    mockedCameras.push(cameraMock)
  }
  return mockedCameras
}

export default createTestCameras
export {
  testCameras, mockCameras
}
