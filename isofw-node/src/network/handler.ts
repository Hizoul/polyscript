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
  try {
    for (const unparsedMessage of messages) {
      console.log("TRYING WITH", unparsedMessage.length)
      if (unparsedMessage.length > 0) {
        console.log("trying parse")
        const message = JSON.parse(unpackMessage(unparsedMessage))
        console.log("PARSED MSSG")
        if (message == null) {
          throw new Error("MSG IS NULL")
        }
        console.log("SUCCESSFULLY PARSED", message.trackId, unparseable[authTokenKey].length)
        cuttableSuccessLength += unparsedMessage.length + val.network.packetDelimiter.length
        unparseable[authTokenKey] = unparseable[authTokenKey].substring(unparsedMessage.length + val.network.packetDelimiter.length)
        console.log("AFTER SUCCESSFUL PARSE IS", unparseable[authTokenKey].length)
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
                console.log("ERROR DOING CALL", e)
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
    if (unparseable[authTokenKey] == null) {
      unparseable[authTokenKey] = ""
    }
    console.log("IN RETRY CAUGHT E", e, toSplit.substring(toSplit.length - 30, toSplit.length - 1))
    if (!retried) {
      console.log("COULDN'T PARSE", e)
      unparseable[authTokenKey] += cuttableSuccessLength > 0 ? toSplit.substring(cuttableSuccessLength) : toSplit
      console.log("UNPARSEABLE IS NOW", unparseable[authTokenKey].substring(unparseable[authTokenKey].length - 30, unparseable[authTokenKey].length - 1))
    }
  }
  if (unparseable[authTokenKey].length > 0 && !retried) {
    console.log("retrying with", unparseable[authTokenKey].substring(unparseable[authTokenKey].length - 30, unparseable[authTokenKey].length - 1))
    await serverRequestHandler(unparseable[authTokenKey], app, authTokenKey, cb, timeStuffMaker, true)
  }
}

export default serverRequestHandler
export {
  connectionAuthTokens
}
