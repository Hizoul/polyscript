import { FeathersClient } from "@xpfw/data-feathers"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import mockCameras from "isofw-node/src/testUtil/mockCameras"
import { savePresetData, updatePreset } from "isofw-shared/src/components/preset/updater"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, ListStore, toJS } from "isofw-shared/src/util/xpfwdata"
import { PresetForm } from "isofw-shared/src/xpfwDefs/preset"
import * as MockDate from "mockdate"
import * as React from "react"
import { StringDecoder } from "string_decoder"
MockDate.set(new Date(4, 2, 0))

BackendClient.client = FeathersClient
const untypedDbStore: any = DbStore

const presetUpdaterTest = (Component?: any) => {
  describe("Preset Update", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      await createTestUsers(appRef.app)
      await logIntoUser()
      await createTestCameras(appRef.app)
      const mockedCameras = await mockCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true)
      const presetList = await ListStore.getList(PresetForm, undefined, undefined, true)
      untypedDbStore.currentlyEditing[""] = projectResults[0]._id.toHexString()
      const presetId = presetList.data[0]._id
      await DbStore.getFromServer(presetId, String(PresetForm.collection))
      if (Component) {
        renderSnapshot(<Component id={presetId} />, "Before anything")
      } else {
        expect(toJS(DbStore)).toMatchSnapshot("Before anything")
      }
      await updatePreset(presetId, true)()
      if (Component) {
        renderSnapshot(<Component id={presetId} />, " after setting to true ")
      } else {
        expect(toJS(DbStore)).toMatchSnapshot("AfterSetting to true")
      }
      await updatePreset(presetId, false)()
      if (Component) {
        renderSnapshot(<Component id={presetId} />, " after setting 2 falls ")
      } else {
        expect(toJS(DbStore)).toMatchSnapshot("AfterSetting to False")
      }
      await savePresetData(presetId)()
      await promiseTimeout(2000)
      if (Component) {
        renderSnapshot(<Component id={presetId} />, "after updating presets preview")
      } else {
        expect(toJS(DbStore)).toMatchSnapshot("after updating preset preview")
      }
      await promiseTimeout(1000)
      await appRef.cleanUp()
    }, 100000)
  })
}
export default presetUpdaterTest
