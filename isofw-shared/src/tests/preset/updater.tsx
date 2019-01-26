import { FormStore, SharedField } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { prefixMaker, TestDefs, ValidationRegistry } from "@xpfw/validate"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
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
import { PresetAssistantForm, PresetCameraField,
  PresetForm, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectProgram, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"
import { matchStoreState } from "resub-persist"
BackendClient.client = FeathersClient
const untypedDbStore: any = DbStore

const presetUpdaterTest = (Component?: any) => {
  describe("Preset Update", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true)
      const presetList = await ListStore.getList("presets", PresetForm, undefined, true)
      untypedDbStore.currentlyEditing = projectResults[0]._id
      const thisReference = {
        props: {
          id: presetList.result[0]._id
        }
      }
      if (Component) {
        renderSnapshot(<Component id={thisReference.props.id} />, "Before anything")
      } else {
        matchStoreState(DbStore, "Before anything")
      }
      await updatePreset(thisReference, true)()
      if (Component) {
        renderSnapshot(<Component id={thisReference.props.id} />, " after setting to true ")
      } else {
        matchStoreState(DbStore, "AfterSetting to true")
      }
      await updatePreset(thisReference, false)()
      if (Component) {
        renderSnapshot(<Component id={thisReference.props.id} />, " after setting 2 falls ")
      } else {
        matchStoreState(DbStore, "AfterSetting to False")
      }
      await promiseTimeout(1000)
      await appRef.cleanUp()
    }, 100000)
  })
}
export default presetUpdaterTest
