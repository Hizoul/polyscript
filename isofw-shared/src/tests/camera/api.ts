import { FeathersClient } from "@xpfw/data-feathers"
import { makeSubFields } from "@xpfw/form-tests"
import getCameraMock from "isofw-node/src/testUtil/getCameraMock"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { cameraCommand } from "isofw-shared/src/cameraApi"
import val from "isofw-shared/src/globals/val"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import { BackendClient, DbStore, toJS, UserStore } from "isofw-shared/src/util/xpfwdata"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { PresetActionTypeField, PresetAssistantForm, PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import * as MockDate from "mockdate"
MockDate.set(new Date(4, 2, 0))

BackendClient.client = FeathersClient

const cameraApiTest = () => {
  describe("Preset Update", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      console.log("AFTER LOGIN USER IS", UserStore.getLoggedIn(), UserStore.user)
      const cameraResult = await createTestCameras(appRef.app)
      const mockCamera = await getCameraMock()
      await appRef.app.service(val.service.camera).patch(
        cameraResult[0]._id, {[String(CameraIp.title)]: `http://localhost:${mockCamera.port}`})
      expect(toJS(DbStore)).toMatchSnapshot("Before anything")
      expect(mockCamera.requests).toMatchSnapshot("requests before anything")
      const prFields = makeSubFields(PresetAssistantForm)
      prFields[String(PresetActionTypeField.title)].setValue(cameraCommand.doZoom)
      prFields[String(PresetNumberField.title)].setValue(3)
      console.log(" result ", await DbStore.patch(cameraResult[0]._id, PresetAssistantForm))
      expect(toJS(DbStore)).toMatchSnapshot(" after zooming in ")
      expect(mockCamera.requests).toMatchSnapshot("requests after Starting zoom in")

      prFields[String(PresetActionTypeField.title)].setValue(cameraCommand.doZoom)
      prFields[String(PresetNumberField.title)].setValue(73)
      await DbStore.patch(cameraResult[0]._id, PresetAssistantForm)
      expect(toJS(DbStore)).toMatchSnapshot(" after zooming Out ")
      expect(mockCamera.requests).toMatchSnapshot("requests after starting zoom out")

      prFields[String(PresetActionTypeField.title)].setValue(cameraCommand.doZoom)
      prFields[String(PresetNumberField.title)].setValue(50)
      await DbStore.patch(cameraResult[0]._id, PresetAssistantForm)
      expect(toJS(DbStore)).toMatchSnapshot(" after Stop zooming ")
      expect(mockCamera.requests).toMatchSnapshot("requests after Stop zoom")

      prFields[String(PresetActionTypeField.title)].setValue(cameraCommand.updatePreset)
      prFields[String(PresetNumberField.title)].setValue(5)
      await DbStore.patch(cameraResult[0]._id, PresetAssistantForm)
      expect(toJS(DbStore)).toMatchSnapshot(" after Saving preset ")
      expect(mockCamera.requests).toMatchSnapshot("requests after Updating preset")

      prFields[String(PresetActionTypeField.title)].setValue(cameraCommand.goToPreset)
      prFields[String(PresetNumberField.title)].setValue(9)
      await DbStore.patch(cameraResult[0]._id, PresetAssistantForm)
      expect(toJS(DbStore)).toMatchSnapshot(" after Going to preset")
      expect(mockCamera.requests).toMatchSnapshot("requests after going to preset")
      await mockCamera.cleanUp()
      await appRef.cleanUp()
    }, 100000)
  })
}
export default cameraApiTest
