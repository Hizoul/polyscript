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
import { ProjectForm, ProjectProgram, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"
import { matchStoreState } from "resub-persist"
BackendClient.client = FeathersClient
const untypedDbStore: any = DbStore

const setCameraAtIndex = (index: number, cameraId: string) => {
  return setValueWithPreset({
    props: {
      field: {mapTo: `${ProjectProgram.mapTo}[${index}]${PresetCameraField.mapTo}`},
      setValue: (a: any) => FormStore.setValue(`${ProjectProgram.mapTo}[${index}]${PresetCameraField.mapTo}`, a)
    }
  })(cameraId)
}

const freeUnusedPresets = (Component?: any) => {
  describe("free unused presets after program Update", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true)
      const projectId = projectResults[0]._id.toHexString()
      ListStore.pageSize = 5
      FormStore.setValue(`list.${PresetCameraField.mapTo}`, cameraResult[0]._id)
      await ListStore.getList("presets", PresetForm, "list", true)
      if (Component) {
        renderSnapshot(<Component id={projectId} collection={ProjectForm.collection} />, "Before anything")
      } else {
        matchStoreState(DbStore,  "Before anything")
        matchStoreState(ListStore,  "before anything")
      }

      await DbStore.getEditOriginal(projectId, ProjectForm, undefined, true)
      await setCameraAtIndex(0, cameraResult[0]._id)
      await setCameraAtIndex(1, cameraResult[0]._id)
      await setCameraAtIndex(2, cameraResult[0]._id)
      await setCameraAtIndex(3, cameraResult[0]._id)
      await ListStore.getList("presets", PresetForm,  "list", true)
      if (Component) {
        renderSnapshot(<Component id={projectId} collection={ProjectForm.collection} />,
          "after reservation of four presets")
      } else {
        matchStoreState(DbStore,  "after reservation of four presets")
        matchStoreState(ListStore,  "after reservation of four presets")
      }
      await DbStore.getGetState(projectId, val.service.presetAssistant, true)
      await promiseTimeout(1000)
      await ListStore.getList("presets", PresetForm,  "list", true)
      if (Component) {
        renderSnapshot(<Component id={projectId} collection={ProjectForm.collection} />,
          "after All having been freed up again")
      } else {
        matchStoreState(DbStore,  "after All having been freed up again")
        matchStoreState(ListStore,  "after All having been freed up again")
      }
      await appRef.cleanUp()
    }, 100000)
  })
}
export default freeUnusedPresets
