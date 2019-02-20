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

import * as MockDate from "mockdate"
MockDate.set(new Date(4, 2, 0))

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
      await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true)
      const projectId = projectResults[0]._id.toHexString()
      const cameraId = cameraResult[0]._id.toHexString()
      ListStore.pageSize = 5
      const prFields = makeSubFields(PresetForm)
      prFields[String(PresetCameraField.title)].setValue(cameraId)
      await ListStore.getList(PresetForm, undefined, undefined, true)
      if (Component) {
        // renderSnapshot(<Component id={thisReference.props.id} />, "Before anything")
      } else {
        expect(toJS(ListStore)).toMatchSnapshot(" before aanything ")
      }

      await DbStore.getEditOriginal(projectId, ProjectForm, undefined, undefined, true)
      await setCameraAtIndex(0, cameraId)
      await setCameraAtIndex(1, cameraId)
      await setCameraAtIndex(2, cameraId)
      await setCameraAtIndex(3, cameraId)
      await ListStore.getList(PresetForm, undefined, undefined, true)
      if (Component) {
        // renderSnapshot(<Component id={thisReference.props.id} />, "Before anything")
      } else {
        expect(toJS(ListStore)).toMatchSnapshot("after reservation of four presets")
      }
      await setCameraAtIndex(1, cameraResult[1]._id.toHexString())
      await setCameraAtIndex(2, cameraResult[1]._id.toHexString())

      await DbStore.patch(projectId, ProjectForm, undefined)
      await ListStore.getList(PresetForm, undefined, undefined, true)
      if (Component) {
        // renderSnapshot(<Component id={thisReference.props.id} />, "Before anything")
      } else {
        expect(toJS(ListStore)).toMatchSnapshot("presets of camera 1 are all free again again")
      }
      prFields[String(PresetCameraField.title)].setValue(cameraResult[1]._id.toHexString())
      await ListStore.getList(PresetForm, undefined, undefined, true)
      if (Component) {
        // renderSnapshot(<Component id={thisReference.props.id} />, "Before anything")
      } else {
        expect(toJS(ListStore)).toMatchSnapshot("two presets of camera 1 are now reserved")
      }
      await appRef.cleanUp()
    }, 100000)
  })
}
export default freeUnusedPresets
