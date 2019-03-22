import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import BenchmarkStore from "isofw-shared/src/network/benchmarkStore"
import connect from "isofw-shared/src/util/backendConnection"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { AuthForm, UserStore } from "isofw-shared/src/util/xpfwdata"
import { FormStore } from "isofw-shared/src/util/xpfwform"
import TCPClient from "./tcpClient"

const projectToBenchmark = "5c93963c1a18bd2c58a21736"

const doeNodeBenchmark = async () => {
  console.log("NETWORK OPTIONS ARE", val.network, urls.mainServer)
  console.log("connecting")
  try {
    connect(undefined, () => {
      if (val.network.networkToUse === val.network.tcp) {
        return TCPClient
      }
      return undefined
    })
  } catch (e) {

  }
  await promiseTimeout(2000)
  console.log("LOGGING IN")
  FormStore.setValue(String(AuthForm.title), {email: "mac", password: "a"})
  await UserStore.login()
  console.log("starting benchmark")
  try {
    await BenchmarkStore.causeProjectTraffic(projectToBenchmark)()
    console.log("DONE")
    process.exit(0)
  } catch (e) {
    console.log("error doing benchmark", e)
    process.exit(-1)
  }
}

doeNodeBenchmark()
