import { Hook } from "@feathersjs/feathers"
import { get } from "lodash"
import val from "../../../../../isofw-shared/src/globals/val"

const forkedHooks: () => Hook = () => {
  const BgWorker = require("./bg.worker")
  const hookWorker = new BgWorker()
  return (hook) => {
    hookWorker.onmessage = async (msg: any) => {
      if (msg.data.projectChanged) {
        hook.app.service(val.service.project).update(msg.data.projectId, await hook.app.service(val.service.project).get(msg.data.projectId))
      }
    }
    const projectId = get(hook, `result._id`)
    hookWorker.postMessage({projectId})
    return hook
  }
}

export default forkedHooks
