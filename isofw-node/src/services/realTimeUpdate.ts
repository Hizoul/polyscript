import * as feathers from "@feathersjs/feathers"
import val from "isofw-shared/src/globals/val"
import { ProjectForm } from "../../../isofw-shared/src/xpfwDefs/project";

const projectCol: any = ProjectForm.collection
const realTimeUpdate: any = (app: feathers.Application) => {
  const publisher: any = (data: any, context: any) => {
    return [
      app.channel(val.channels.realtime)
    ]
  }
  app.service(projectCol).publish("patched", publisher)
  app.on("login", (payload, { connection }) => {
    if (connection) {
      app.channel(val.channels.realtime).join(connection)
    }
  })
  return app
}

export default realTimeUpdate
