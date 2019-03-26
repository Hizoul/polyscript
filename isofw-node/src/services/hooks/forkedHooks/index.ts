import { Hook } from "@feathersjs/feathers"
import { get } from "lodash"
import * as BgWorker from "./bg.worker"

const forkedHooks: () => Hook = () => {
  const hookWorker = new BgWorker()
  setTimeout(() => hookWorker.postMessage({projectId: "5c93963c1a18bd2c58a21736"}), 2000)
  return (hook) => {
    const projectId = get(hook, `result._id`)
    hookWorker.postMessage({projectId})
    return hook
  }
}

export default forkedHooks
