import { FormStore, SharedField } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { prefixMaker, TestDefs, ValidationRegistry } from "@xpfw/validate"
import getCameraMock from "isofw-node/src/testUtil/getCameraMock"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { cameraCommand } from "isofw-shared/src/cameraApi"
import { updatePreset } from "isofw-shared/src/components/preset/updater"
import { setValueWithPreset } from "isofw-shared/src/components/project/cameraChooser"
import { directorPrefix, increaseShotNumber } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import createTestCameras, { testCameras } from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers, { testUsers } from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "isofw-shared/src/util/xpfwuishared"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { PresetActionTypeField, PresetAssistantForm,
  PresetCameraField, PresetForm, PresetIsReadyField, PresetNumberField, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectProgram, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"
import { matchStoreState } from "resub-persist"

BackendClient.client = FeathersClient
const untypedDbStore: any = DbStore

const cameraApiTest = () => {
  describe("Preset Update", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const mockCamera = await getCameraMock()
      await appRef.app.service(val.service.camera).patch(
        cameraResult[0]._id, {[CameraIp.mapTo]: `http://localhost:${mockCamera.port}`})
      matchStoreState(DbStore, "Before anything")
      expect(mockCamera.requests).toMatchSnapshot("requests before anything")
      FormStore.setValue(PresetActionTypeField.mapTo, cameraCommand.startZoom)
      FormStore.setValue(PresetIsReadyField.mapTo, true)
      console.log(" result ", await DbStore.patch(cameraResult[0]._id, PresetAssistantForm))
      matchStoreState(DbStore, " after zooming in ")
      expect(mockCamera.requests).toMatchSnapshot("requests after Starting zoom in")

      FormStore.setValue(PresetActionTypeField.mapTo, cameraCommand.startZoom)
      FormStore.setValue(PresetIsReadyField.mapTo, false)
      await DbStore.patch(cameraResult[0]._id, PresetAssistantForm)
      matchStoreState(DbStore, " after zooming Out ")
      expect(mockCamera.requests).toMatchSnapshot("requests after starting zoom out")

      FormStore.setValue(PresetActionTypeField.mapTo, cameraCommand.stopZoom)
      await DbStore.patch(cameraResult[0]._id, PresetAssistantForm)
      matchStoreState(DbStore, " after Stop zooming ")
      expect(mockCamera.requests).toMatchSnapshot("requests after Stop zoom")

      FormStore.setValue(PresetActionTypeField.mapTo, cameraCommand.updatePreset)
      FormStore.setValue(PresetNumberField.mapTo, 6)
      await DbStore.patch(cameraResult[0]._id, PresetAssistantForm)
      matchStoreState(DbStore, " after Saving preset ")
      expect(mockCamera.requests).toMatchSnapshot("requests after Updating preset")

      FormStore.setValue(PresetActionTypeField.mapTo, cameraCommand.goToPreset)
      FormStore.setValue(PresetNumberField.mapTo, 9)
      await DbStore.patch(cameraResult[0]._id, PresetAssistantForm)
      matchStoreState(DbStore, " after Going to preset")
      expect(mockCamera.requests).toMatchSnapshot("requests after going to preset")
      await mockCamera.cleanUp()
      await appRef.cleanUp()
    }, 100000)
  })
}
export default cameraApiTest
