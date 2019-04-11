import { Hook } from "@feathersjs/feathers"
import { get } from "lodash"
import * as BgWorkerA from "./bg.worker"
const BgWorker: any = BgWorkerA
const forkedHooks: () => Hook = () => {
  const hookWorker = new BgWorker()
  return (hook) => {
    const projectId = get(hook, `result._id`)
    hookWorker.postMessage({projectId})
    return hook
  }
}

export default forkedHooks