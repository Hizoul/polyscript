import { Application } from "@feathersjs/feathers"

const serverRequestHandler = (message: any, app: any) => {
  if (message != null && message.type != null) {
    if (message.collection != null) {
      if (Array.isArray(message.data)) {
        return app.service(message.collection)[message.type](...message.data)
      }
    }
    return Promise.reject({error: "no collection specified"})
  }
  return Promise.reject({error: "no type specified"})
}

export default serverRequestHandler
