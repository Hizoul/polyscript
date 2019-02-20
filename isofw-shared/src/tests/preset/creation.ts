import { makeSubFields } from "@xpfw/form-tests"
import { FeathersClient } from "@xpfw/ui-feathers"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { setValueWithPreset } from "isofw-shared/src/components/project/cameraChooser"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import { BackendClient, DbStore, ListStore, toJS } from "isofw-shared/src/util/xpfwdata"
import { FormStore } from "isofw-shared/src/util/xpfwform"
import { PresetAssistantForm, PresetCameraField,
  PresetForm, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
BackendClient.client = FeathersClient
const untypedDbStore: any = DbStore

const presetCreationTest = () => {
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
      await ListStore.getList(PresetForm, undefined, undefined, true)
      expect(toJS(ListStore)).toMatchSnapshot(" fetched presets ")
      const prFields = makeSubFields(PresetAssistantForm)
      prFields[String(PresetCameraField.title)].setValue(cameraResult[0]._id)
      prFields[String(PresetProjectField.title)].setValue(projectResults[0]._id)
      expect(toJS(DbStore)).toMatchSnapshot("Before preset is being pushed via real-time")
      const iDFetchedResults = await DbStore.create(PresetAssistantForm, prefix)
      expect(iDFetchedResults).toMatchSnapshot(" first available ID ")
      expect(toJS(DbStore)).toMatchSnapshot("after preset has been pushed via real-time")
      expect(toJS(DbStore)).toMatchSnapshot("Before using the utility function")
      expect(toJS(FormStore)).toMatchSnapshot("Before using the utility function")
      untypedDbStore.currentlyEditing = projectResults[0]._id
      await setValueWithPreset(PresetCameraField, undefined, undefined)(cameraResult[1]._id)
      expect(toJS(DbStore)).toMatchSnapshot("After using the utility function")
      expect(toJS(FormStore)).toMatchSnapshot("After using the utility function")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default presetCreationTest
