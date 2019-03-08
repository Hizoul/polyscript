import { makeSubFields } from "@xpfw/form-tests"
import TCPClient from "isofw-node/src/network/tcpClient"
import getNetworkTestApp from "isofw-node/src/testUtil/getNetworkTestApp"
import { setValueWithPreset } from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, ListStore, toJS, UserStore } from "isofw-shared/src/util/xpfwdata"
import { FormStore } from "isofw-shared/src/util/xpfwform"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import {
  PresetAssistantForm, PresetCameraField, PresetForm, PresetProjectField
} from "isofw-shared/src/xpfwDefs/preset"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"

BackendClient.client = TCPClient
const untypedDbStore: any = DbStore
const networkTest = (useNetwork: number) => {
  describe("network client test", () => {
    it("should work", async () => {
      const tcpServer = await getNetworkTestApp(useNetwork, TCPClient)
      await createTestUsers(tcpServer.app)
      expect(toJS(UserStore)).toMatchSnapshot("Before Login")
      await logIntoUser()
      expect(toJS(UserStore)).toMatchSnapshot("After Login")

      expect(toJS(DbStore)).toMatchSnapshot("After Log in but before real-time")
      await tcpServer.app.service(val.service.camera).create({
        _id: "c9bbbbbbbbbbbbbbbbbbbbbb",
        [String (ProjectName.title)]: " real-time created camera ",
        [String (CameraIp.title)]: "What an IP"
      })
      await promiseTimeout(1000)
      expect(toJS(DbStore)).toMatchSnapshot("After Log in And after real-time")
      const cameraResult = await createTestCameras(tcpServer.app)
      expect(cameraResult).toMatchSnapshot(" creation of Cameras")
      const projectResults = await createTestProjects(tcpServer.app, true)
      expect(projectResults).toMatchSnapshot(" creation of Projects ")
      ListStore.pageSize = 400
      await ListStore.getList(PresetForm, undefined, undefined, true)
      expect(toJS(ListStore)).toMatchSnapshot(" fetched presets ")
      const prFields = makeSubFields(PresetAssistantForm)
      prFields[String(PresetCameraField.title)].setValue(cameraResult[0]._id.toHexString())
      prFields[String(PresetProjectField.title)].setValue(projectResults[0]._id.toHexString())
      expect(toJS(DbStore)).toMatchSnapshot("Before preset is being pushed via real-time")
      const iDFetchedResults = await DbStore.create(PresetAssistantForm)
      expect(iDFetchedResults).toMatchSnapshot(" first available ID ")
      expect(toJS(DbStore)).toMatchSnapshot("after preset has been pushed via real-time")
      expect(toJS(DbStore)).toMatchSnapshot("Before using the utility function")
      untypedDbStore.currentlyEditing = projectResults[0]._id.toHexString()
      await setValueWithPreset(PresetCameraField, undefined, undefined)(cameraResult[1]._id.toHexString())
      expect(toJS(DbStore)).toMatchSnapshot("After using the utility function")
      expect(toJS(FormStore)).toMatchSnapshot("After using the utility function")
      await tcpServer.cleanUp()
      await promiseTimeout(1000)
    }, 16000)
  })

}

export default networkTest
