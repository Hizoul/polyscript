import console = require("console");
import TCPClient from "isofw-node/src/network/client"
import getNetworkTestApp from "isofw-node/src/testUtil/getNetworkTestApp"
import val from "isofw-shared/src/globals/val"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import { BackendClient, DbStore, toJS, UserStore } from "isofw-shared/src/util/xpfwdata"

BackendClient.client = TCPClient
describe("tcp client test", () => {
  it("should work", async () => {
    console.log("PREPARING TCP SERVER")
    const tcpServer = await getNetworkTestApp(val.network.tcp, TCPClient)
    console.log("PREPARING TCP USER")
    const userResults = await createTestUsers(tcpServer.app)
    expect(toJS(UserStore)).toMatchSnapshot("Before Login")
    console.log("PREPARING TCP LOGIn")
    await logIntoUser()
    expect(toJS(UserStore)).toMatchSnapshot("After Login")
    await tcpServer.cleanUp()
  }, 8000)
})
