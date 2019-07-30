import connectMongo from "isofw-node/src/connectMongo"
import val from "isofw-shared/src/globals/val"
import { get } from "lodash"
import handleProjectHooksNative from "./handleProjectHooksNative"
import Queue from "./queue"

export interface BgQueueEntry {
  type: string
  projectId?: string
}

console.log("Background Hook Worker starting")
const init = async () => {
  const db = await connectMongo()
  const queue = new Queue<BgQueueEntry>(async (entry) => {
    try {
      switch (entry.data.type) {
        case "afterProjectPatch": {
          if (entry.data.projectId != null) {
            const result: any = await handleProjectHooksNative(db, entry.data.projectId)
            self.postMessage(result, "hookResult")
            entry.resolve()
          }
          return Promise.resolve()
        }
        default: {
          entry.resolve()
          return Promise.resolve()
        }
      }
    } catch (e) {
      entry.reject(e)
    }
    return Promise.resolve()
  })
  self.onmessage = (msg) => {
    console.log("Hook Worker received message", msg)
    const projectId: any = get(msg, "data.projectId")
    queue.queueCall({type: "afterProjectPatch", projectId})
  }
}

init()
