import { Hook } from "@feathersjs/feathers"
import { get } from "lodash"

const forkedHooks: () => Hook = () => {
  const BgWorker = require("./bg.worker")
  const hookWorker = new BgWorker()
  return (hook) => {
    const projectId = get(hook, `result._id`)
    hookWorker.postMessage({projectId})
    return hook
  }
}

export default forkedHooks
