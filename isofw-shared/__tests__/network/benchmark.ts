import FeathersClient from "@xpfw/data-feathers"
import { makeSubFields } from "@xpfw/form-tests"
import TCPClient from "isofw-node/src/network/tcpClient"
import UDPClient from "isofw-node/src/network/udpClient"
import getNetworkTestApp from "isofw-node/src/testUtil/getNetworkTestApp"
import { setValueWithPreset } from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import causeProjectTraffic from "isofw-shared/src/network/causeProjectTraffic"
import makeBenchmarkClient from "isofw-shared/src/network/clientBenchmarker"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects, { testProjects } from "isofw-shared/src/testUtil/data/project"
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
      {network: val.network.websocket, client: FeathersClient},
      {network: val.network.tcp, client: TCPClient}
    ]
    const toClean: any[] = []
    for (const config of configs) {
      const clientToUse = makeBenchmarkClient(config.client)
      BackendClient.client = clientToUse
      const tcpServer = await getNetworkTestApp(config.network, clientToUse)
      toClean.push(tcpServer)
      await createTestUsers(tcpServer.app)
      await createTestCameras(tcpServer.app)
      const projectResult = await createTestProjects(tcpServer.app, true, true)
      await logIntoUser()
      await causeProjectTraffic(clientToUse, projectResult[0]._id.toHexString(), config.network)
      await promiseTimeout(1000)
    }
    for (const cleaner of toClean) {
      await cleaner.cleanUp()
    }
  }, 1600000)
})
