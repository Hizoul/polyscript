import { FeathersClient } from "@xpfw/data-feathers"
import { makeSubFields } from "@xpfw/form-tests"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { setValueWithPreset } from "isofw-shared/src/components/project/cameraChooser"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import { BackendClient, DbStore, ListStore, toJS } from "isofw-shared/src/util/xpfwdata"
import { PresetCameraField, PresetForm } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectForm, ProjectProgram, ProjectShot } from "isofw-shared/src/xpfwDefs/project"

BackendClient.client = FeathersClient

const setCameraAtIndex = (index: number, cameraId: string) => {
  const schema = {
    type: "string",
    title: `${ProjectProgram.title}[${index}]${PresetCameraField.title}`
  }
  return setValueWithPreset(schema, undefined, undefined)(cameraId)
}

const freeUnusedPresets = (Component?: any) => {
  describe("free unused presets after program Update", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true)
      const projectId = projectResults[0]._id
      ListStore.pageSize = 5
      const prFields = makeSubFields(PresetForm)
      prFields[String(PresetCameraField.title)].setValue(cameraResult[0]._id)
      await ListStore.getList(PresetForm, undefined, undefined, true)
      if (Component) {
        // renderSnapshot(<Component id={thisReference.props.id} />, "Before anything")
      } else {
        expect(toJS(ListStore)).toMatchSnapshot(" before aanything ")
      }

      await DbStore.getEditOriginal(projectId, ProjectForm, undefined, undefined, true)
      await setCameraAtIndex(0, cameraResult[0]._id)
      await setCameraAtIndex(1, cameraResult[0]._id)
      await setCameraAtIndex(2, cameraResult[0]._id)
      await setCameraAtIndex(3, cameraResult[0]._id)
      await ListStore.getList(PresetForm, undefined, undefined, true)
      if (Component) {
        // renderSnapshot(<Component id={thisReference.props.id} />, "Before anything")
      } else {
        expect(toJS(ListStore)).toMatchSnapshot("after reservation of four presets")
      }
      await setCameraAtIndex(1, cameraResult[1]._id)
      await setCameraAtIndex(2, cameraResult[1]._id)

      await DbStore.patch(projectId, ProjectForm, undefined)
      await ListStore.getList(PresetForm, undefined, undefined, true)
      if (Component) {
        // renderSnapshot(<Component id={thisReference.props.id} />, "Before anything")
      } else {
        expect(toJS(ListStore)).toMatchSnapshot("after 2 having been freed up again")
      }
      await appRef.cleanUp()
    }, 100000)
  })
}
export default freeUnusedPresets
