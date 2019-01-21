import * as feathers from "@feathersjs/feathers"
import pluginCollections from "isofw-node/src/services/xpfw" 
import presetCreator from "isofw-node/src/services/hooks/presetCreator";
import realTimeUpdate from "./realTimeUpdate"
import val from "isofw-shared/src/globals/val";

const customServiceConfigurator: any = (db: any) => {
  return (app: feathers.Application) => {
    app.configure(pluginCollections(db))
    app.configure(realTimeUpdate)
    app.service(val.service.camera).hooks({after: {create: presetCreator}})
    return app
  }
}

export default customServiceConfigurator
