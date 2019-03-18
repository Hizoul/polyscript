import getCameraMock from "isofw-node/src/testUtil/getCameraMock"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { testCameras } from "isofw-shared/src/testUtil/data/camera"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"

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

export default mockCameras
