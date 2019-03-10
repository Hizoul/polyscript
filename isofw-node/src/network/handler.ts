import val from "isofw-shared/src/globals/val"
import { isString } from "lodash"

let unparseable = ""
let tries = 0
const serverRequestHandler = async (data: any, app: any, cb: any, timeStuffMaker: any) => {
  const toSplit = isString(data) ? data : data.toString("utf8")
  const messages = toSplit.split(val.network.packetDelimiter)
  for (const unparsedMessage of messages) {
    if (unparsedMessage.length > 0) {
      try {
        const message = JSON.parse(unparsedMessage)
        const timeStuff = timeStuffMaker()
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
              cb({
                trackId: message.trackId, result
              }, timeStuff)
            }
          }
          cb({trackId: message.trackId, error: "no collection specified"})
        }
        cb({trackId: message.trackId, error: "no method specified"})
      } catch (e)  {
        unparseable += unparsedMessage
        tries++
        if (tries > 1) {
          tries = 0
          const toTry = unparseable
          unparseable = ""
          serverRequestHandler(toTry, app, cb, timeStuffMaker)
        }
      }
    }
  }
}

export default serverRequestHandler
