import console = require("console")
import val from "isofw-shared/src/globals/val"
import { unpackMessage } from "isofw-shared/src/network/compression"
import { isString } from "lodash"

const connectionAuthTokens: any = {}

const unparseable: any = {}

const serverRequestHandler = async (data: any, app: any, authTokenKey: any, cb: any, timeStuffMaker: any, retried?: boolean) => {
  const toSplit = isString(data) ? data : data.toString("utf8")
  const messages = toSplit.split(val.network.packetDelimiter)
  let cuttableSuccessLength = 0
  if (unparseable[authTokenKey] == null) {
    unparseable[authTokenKey] = ""
  }
  try {
    for (const unparsedMessage of messages) {
      if (unparsedMessage.length > 0) {
        const message = JSON.parse(unpackMessage(unparsedMessage))
        if (message == null) {
          throw new Error("MSG IS NULL")
        }
        console.log("HANDLING", message.trackId)
        cuttableSuccessLength += unparsedMessage.length + val.network.packetDelimiter.length
        if (unparseable[authTokenKey].length > 0) {
          unparseable[authTokenKey] = unparseable[authTokenKey]
            .substring(unparsedMessage.length + val.network.packetDelimiter.length)
        }
        const timeStuff = timeStuffMaker()
        if (message != null && message.method != null) {
          if (message.collection != null) {
            if (Array.isArray(message.data)) {
              let args: any[] = []
              const baseParams: any = {
                provider: "rest"
              }
              if (connectionAuthTokens[authTokenKey] != null) {
                baseParams.headers = {
                  authorization: connectionAuthTokens[authTokenKey]
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
              try {
                const result = await app.service(message.collection)[message.method](...args)
                if (message.collection === "authentication" && message.method === "create") {
                  connectionAuthTokens[authTokenKey] = result.accessToken
                }
                cb({
                  trackId: message.trackId, result
                }, timeStuff)
              } catch (e) {
                cb({trackId: message.trackId, error: e}, timeStuff)
              }
              return
            }
          }
          cb({trackId: message.trackId, error: "no collection specified"}, timeStuff)
          return
        }
        cb({trackId: message.trackId, error: "no method specified"}, timeStuff)
        return
      }
    }
  } catch (e)  {
    if (!retried) {
      unparseable[authTokenKey] += cuttableSuccessLength > 0 ? toSplit.substring(cuttableSuccessLength) : toSplit
    }
  }
  if (unparseable[authTokenKey].length > 0 && !retried) {
    await serverRequestHandler(unparseable[authTokenKey], app, authTokenKey, cb, timeStuffMaker, true)
  }
}

export default serverRequestHandler
export {
  connectionAuthTokens
}
