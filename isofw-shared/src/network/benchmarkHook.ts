import { memo } from "@xpfw/form"
import BenchmarkStore from "./benchmarkStore"

const useBenchmark = (projectId: string) => {
  const causer = memo(() => BenchmarkStore.causeProjectTraffic(projectId), [projectId])
  return {
    currentlyAt: BenchmarkStore.currentlyAt,
    causeProjectTraffic: causer,
    total: BenchmarkStore.total,
    uploaded: BenchmarkStore.uploaded,
    loading: BenchmarkStore.loading
  }
}

export default useBenchmark
