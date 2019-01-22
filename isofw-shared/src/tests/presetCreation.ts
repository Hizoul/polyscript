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
import { ProjectForm, ProjectName, ProjectShot, ProjectOperatorCameraMapping, ProjectOperators, ProjectCameras, ProjectProgram } from "isofw-shared/src/xpfwDefs/project"
import { matchStoreState } from "resub-persist"
import { PresetForm, PresetCameraField, PresetAssistantForm, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset";
import { setValueWithPreset } from "isofw-shared/src/components/project/cameraChooser";
import promiseTimeout from "src/util/promiseTimeout";
BackendClient.client = FeathersClient
const untypedDbStore: any = DbStore

const presetCreationTest = (Component: any) => {
  describe("Preset creation", () => {
    it("works as planned", async () => {
      const prefix = "presetCreationPrefix"
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
      FormStore.setValue(`${prefixMaker(prefix)}${PresetCameraField.mapTo}`, cameraResult[0]._id)
      FormStore.setValue(`${prefixMaker(prefix)}${PresetProjectField.mapTo}`, projectResults[0]._id)
      matchStoreState(DbStore, "Before preset is being pushed via real-time")
      const iDFetchedResults = await DbStore.create(PresetAssistantForm, prefix)
      expect(iDFetchedResults).toMatchSnapshot(" first available ID ")
      matchStoreState(DbStore, "after preset has been pushed via real-time")
      matchStoreState(DbStore, "Before using the utility function")
      matchStoreState(FormStore, "Before using the utility function")
      untypedDbStore.currentlyEditing = projectResults[0]._id
      const thisReference = {
        props: {
          prefix, field: {mapTo: `${ProjectProgram.mapTo}[5]${PresetCameraField.mapTo}`}, setValue: (a:any) => FormStore.setValue(`${prefixMaker(prefix)}${ProjectProgram.mapTo}[5]${PresetCameraField.mapTo}`, a)
        }
      }
      await setValueWithPreset(thisReference)(cameraResult[1]._id)
      matchStoreState(DbStore, "After using the utility function")
      matchStoreState(FormStore, "After using the utility function")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default presetCreationTest