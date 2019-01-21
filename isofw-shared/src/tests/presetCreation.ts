import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { FormStore, SharedField } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "isofw-shared/src/util/xpfwuishared"
import { TestDefs, ValidationRegistry, prefixMaker } from "@xpfw/validate"
import createTestUsers, { testUsers } from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestCameras, { testCameras } from "isofw-shared/src/testUtil/data/camera"
import { increaseShotNumber, directorPrefix } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import { ProjectForm, ProjectName, ProjectShot, ProjectOperatorCameraMapping, ProjectOperators, ProjectCameras } from "isofw-shared/src/xpfwDefs/project"
import { matchStoreState } from "resub-persist"
import { PresetForm } from "isofw-shared/src/xpfwDefs/preset";
BackendClient.client = FeathersClient

const presetCreationTest = (Component: any) => {
  describe("Preset creation", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      expect(cameraResult).toMatchSnapshot(" creation of Cameras")
      const projectResults = await createTestProjects(appRef.app, true)
      expect(projectResults).toMatchSnapshot(" creation of Projects ")
      ListStore.pageSize = 400
      await ListStore.getList("presets", PresetForm, undefined, true)
      matchStoreState(ListStore,  " fetched presets ")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default presetCreationTest