import FeathersClient from "@xpfw/data-feathers"
import { makeSubFields } from "@xpfw/form-tests"
import TCPClient from "isofw-node/src/network/tcpClient"
import UDPClient from "isofw-node/src/network/udpClient"
import getNetworkTestApp from "isofw-node/src/testUtil/getNetworkTestApp"
import { setValueWithPreset } from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import makeBenchmarkClient from "isofw-shared/src/network/clientBenchmarker"
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

const untypedDbStore: any = DbStore
describe("network benchmark test", () => {
  it("should collect numeric data", async () => {
    const configs = [
      {network: val.network.tcp, client: TCPClient},
      {network: val.network.udp, client: UDPClient},
      {network: val.network.websocket, client: FeathersClient}
    ]
    for (const config of configs) {
      const clientToUse = makeBenchmarkClient(config.client)
      BackendClient.client = clientToUse
      const tcpServer = await getNetworkTestApp(config.network, clientToUse)
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
      const cameraResult = await createTestCameras(tcpServer.app)
      const projectResults = await createTestProjects(tcpServer.app, true)
      ListStore.pageSize = 400
      await ListStore.getList(PresetForm, undefined, undefined, true)
      await tcpServer.cleanUp()
      await promiseTimeout(1000)
      console.log("THE MEASUREMENTS ARE", clientToUse.measurements)
      expect(clientToUse.measurements.length).not.toBe(0)
    }

  }, 160000)
})
