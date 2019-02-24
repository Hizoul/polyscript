import { FeathersClient } from "@xpfw/data-feathers"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import useDirector, { directorPrefix } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import createTestCameras, { mockCameras } from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import { BackendClient, DbStore, toJS, UserStore } from "isofw-shared/src/util/xpfwdata"
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import * as MockDate from "mockdate"
MockDate.set(new Date(4, 2, 0))

BackendClient.client = FeathersClient

const snapshotCameras = (cams: any[], msg: string) => {
  for (const cam of cams) {
    expect(cam.requests).toMatchSnapshot(msg)
  }
}

const activateNextUnusedPreset = () => {
  describe("Preset Update", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true, true)
      const mockedCameras = await mockCameras(appRef.app)
      expect(toJS(DbStore)).toMatchSnapshot("Before anything")
      snapshotCameras(mockedCameras, "before anything")
      await DbStore.getEditOriginal(projectResults[0]._id.toHexString(), ProjectForm, undefined, directorPrefix, true)
      const directorHelper = useDirector(projectResults[0]._id.toHexString())
      await directorHelper.decrease()
      expect(toJS(DbStore)).toMatchSnapshot("after decrease to 0")
      snapshotCameras(mockedCameras, "after decrease shot to 0")
      await directorHelper.increase()
      snapshotCameras(mockedCameras, "after increase shot to 1")
      await directorHelper.increase()
      snapshotCameras(mockedCameras, "after increase shot to 2")
      await directorHelper.increase()
      snapshotCameras(mockedCameras, "after increase shot to 3")
      await directorHelper.increase()
      snapshotCameras(mockedCameras, "after increase shot to 4")
      await directorHelper.increase()
      snapshotCameras(mockedCameras, "after increase shot to 5")
      await directorHelper.increase()
      snapshotCameras(mockedCameras, "after increase shot to 6")
      for (const cam of mockedCameras) {
        await cam.cleanUp()
      }
      await appRef.cleanUp()
    }, 100000)
  })
}
export default activateNextUnusedPreset
