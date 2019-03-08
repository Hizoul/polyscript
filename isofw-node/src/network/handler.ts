import { isString } from "lodash"

const serverRequestHandler = async (rawMessage: any, app: any) => {
  const message = JSON.parse(isString(rawMessage) ? rawMessage : rawMessage.toString("utf8"))
  if (message != null && message.method != null) {
    if (message.collection != null) {
      if (Array.isArray(message.data)) {
        let args: any[] = []
        const baseParams = {
          provider: "rest",
          headers: {
            authorization: message.currentToken
          }
        }
        switch (message.method) {
          case "find": {
            args = [{
              ...baseParams,
              query: message.data[0].query
            }]
            break
          }
          case "get":
          case "create":
          case "remove": {
            args = [message.data[0], {
              ...baseParams
            }]
            break
          }
          case "patch":
          case "update": {
            args = [message.data[0], message.data[1], {
              ...baseParams
            }]
            break
          }
        }
        const result = await app.service(message.collection)[message.method](...args)
        return {
          trackId: message.trackId, result
        }
      }
    }
    return Promise.resolve({trackId: message.trackId, error: "no collection specified"})
  }
  return Promise.resolve({trackId: message.trackId, error: "no method specified"})
}

export default serverRequestHandler
