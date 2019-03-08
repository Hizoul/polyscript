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
    return app
  }
}

export default customServiceConfigurator
