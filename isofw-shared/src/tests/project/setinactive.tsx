import { FeathersClient } from "@xpfw/data-feathers"
import { FormStore } from "@xpfw/form"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { setValueWithPreset } from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, ListStore, toJS } from "isofw-shared/src/util/xpfwdata"
import { PresetCameraField, PresetForm } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectForm, ProjectProgram } from "isofw-shared/src/xpfwDefs/project"
import * as MockDate from "mockdate"
import * as React from "react"
MockDate.set(new Date(4, 2, 0))

BackendClient.client = FeathersClient

const setCameraAtIndex = (index: number, cameraId: string) => {
  const schema = {
    type: "string",
    title: `${ProjectForm.title}${ProjectProgram.title}[${index}]${PresetCameraField.title}`
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
      ListStore.pageSize = 15
      FormStore.setValue(`list.${PresetForm.title}.${PresetCameraField.title}`, cameraId)
      await ListStore.getList(PresetForm, undefined, "list", true)
      if (Component) {
        renderSnapshot(<Component id={projectId} collection={ProjectForm.collection} />, "Before anything")
      } else {
        expect(toJS(DbStore)).toMatchSnapshot("Before anything")
        expect(toJS(ListStore)).toMatchSnapshot("before anything")
      }

      await DbStore.getEditOriginal(projectId, ProjectForm, undefined, undefined, true)
      await setCameraAtIndex(0, cameraId)
      await setCameraAtIndex(1, cameraId)
      await setCameraAtIndex(2, cameraId)
      await setCameraAtIndex(3, cameraId)
      await DbStore.patch(projectId, ProjectForm, undefined, undefined)
      await ListStore.getList(PresetForm, undefined, "list", true)
      if (Component) {
        renderSnapshot(<Component id={projectId} collection={ProjectForm.collection} />,
          "after reservation of four presets")
      } else {
        expect(toJS(DbStore)).toMatchSnapshot("after reservation of four presets")
        expect(toJS(ListStore)).toMatchSnapshot("after reservation of four presets")
      }
      const u: any = DbStore
      u.lastFetch = {}
      console.log("INACTIVERES", await DbStore.getFromServer(projectId, val.service.presetAssistant))
      await promiseTimeout(1000)
      await ListStore.getList(PresetForm, undefined, "list", true)
      if (Component) {
        renderSnapshot(<Component id={projectId} collection={ProjectForm.collection} />,
          "after All having been freed up again")
      } else {
        expect(toJS(DbStore)).toMatchSnapshot("after All having been freed up again")
        expect(toJS(ListStore)).toMatchSnapshot("after All having been freed up again")
      }
      await appRef.cleanUp()
    }, 100000)
  })
}
export default freeUnusedPresets
