import { dataOptions, UserStore } from "@xpfw/data"
import { memo } from "@xpfw/form"
import { action, observable } from "mobx"
import urls from "../globals/url"
import val from "../globals/val"
import BenchmarkStore from "./benchmarkStore"

const togglePatchDiff = action(() => {
  dataOptions.onlyPatchDiffs = !dataOptions.onlyPatchDiffs
  BenchmarkStore.loading = true
  BenchmarkStore.loading = false
})

const toggleParallel = action(() => {
  BenchmarkStore.parallel = !BenchmarkStore.parallel
})

const useBenchmark = (projectId: string) => {
  const causer = memo(() => BenchmarkStore.causeProjectTraffic(projectId), [projectId])
  return {
    currentlyAt: BenchmarkStore.currentlyAt,
    causeProjectTraffic: causer,
    total: BenchmarkStore.total,
    uploaded: BenchmarkStore.uploaded,
    loading: BenchmarkStore.loading,
    isParallel: BenchmarkStore.parallel, toggleParallel,
    togglePatchDiff, isPatchDiff: dataOptions.onlyPatchDiffs,
    programSize: BenchmarkStore.programSize
  }
}

const connectionStore = observable({
  networkToUse: val.network.networkToUse,
  useCompression: val.network.useCompression,
  ip: urls.mainServer
})

const toggleNetworkToUse = action(() => {
  connectionStore.networkToUse = connectionStore.networkToUse === 1 ? 0 : 1
  val.network.networkToUse = connectionStore.networkToUse
})

const toggleCompression = action(() => {
  connectionStore.useCompression = !connectionStore.useCompression
  val.network.useCompression = connectionStore.useCompression
})

const setIp = action((newValue: any) => {
  connectionStore.ip = newValue
  urls.mainServer = connectionStore.ip
})

const useConnection = () => {
  return {
    networkToUse: connectionStore.networkToUse,
    useCompression: connectionStore.useCompression,
    toggleNetworkToUse, toggleCompression,
    ip: connectionStore.ip, setIp,
    connected: UserStore.getConnected()
  }
}

export default useBenchmark
export {
  useConnection
}
