import * as feathers from "@feathersjs/feathers"
import val from "isofw-shared/src/globals/val"

const realTimeUpdate: any = (app: feathers.Application) => {
  const publisher: any = (data: any, context: any) => {
    return [
      app.channel(val.channel.realtime)
    ]
  }
  app.service(val.service.project).publish("patched", publisher)
  app.service(val.service.preset).publish("patched", publisher)
  app.on("login", (payload, { connection }) => {
    if (connection) {
      app.channel(val.channel.realtime).join(connection)
    }
  })
  return app
}

export default realTimeUpdate
