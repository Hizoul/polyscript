import { dataOptions } from "@xpfw/data"
import { memo } from "@xpfw/form"
import { action } from "mobx"
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

export default useBenchmark
