import * as feathers from "@feathersjs/feathers"
import pluginCollections from "isofw-node/src/services/xpfw" 
import realTimeUpdate from "./realTimeUpdate"

const customServiceConfigurator: any = (db: any) => {
  return (app: feathers.Application) => {
    app.configure(pluginCollections(db))
    app.configure(realTimeUpdate)
    return app
  }
}

export default customServiceConfigurator
