import * as feathers from "@feathersjs/feathers"
import { paramToResult, perfDiff, perfHook, stampHook } from "isofw-node/src/services/hooks/addTimeStamp"
import pluginCollections from "isofw-node/src/services/xpfw"
import val from "isofw-shared/src/globals/val"
import collections from "isofw-shared/src/xpfwDefs/collections"
import presetAssistantConfigurator from "./presetAssistant"
import realTimeUpdate from "./realTimeUpdate"

const customServiceConfigurator: any = (db: any) => {
  return (app: feathers.Application) => {
    app.configure(pluginCollections(db))
    app.configure(realTimeUpdate)
    app.configure(presetAssistantConfigurator)
    if (val.network.addServerTimeInfoForWebSockets) {
      const cols = [...collections, val.service.user, "presetAssistant", "authentication"]
      for (const col of cols) {
        app.service(col).hooks({
          before: {
            all: [
              stampHook("arrive"),
              perfHook("pstart")
            ]
          },
          after: {
            all: [
              perfDiff("pend", "pstart"),
              stampHook("sent"),
              paramToResult("arrive"),
              paramToResult("sent"),
              paramToResult("pend")
            ]
          }
        })
      }
    }
    return app
  }
}

export default customServiceConfigurator
