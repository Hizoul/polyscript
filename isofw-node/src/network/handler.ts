import val from "isofw-shared/src/globals/val"
import lzString from "isofw-shared/src/util/lzString"
import pako from "isofw-shared/src/util/pako"
import { isString } from "lodash"

const connectionAuthTokens: any = {}

const unparseable: any = {}

const serverRequestHandler = async (data: any, app: any, authTokenKey: any, cb: any, timeStuffMaker: any, retried?: boolean) => {
  const toSplit = isString(data) ? data : data.toString("utf8")
  const messages = toSplit.split(val.network.packetDelimiter)
  try {
  for (const unparsedMessage of messages) {
    if (unparsedMessage.length > 0) {
        let uncompressedMessage =  unparsedMessage
        if (val.network.useCompression) {
          if (val.network.useGzipCompression) {
            uncompressedMessage = pako.ungzip(unparsedMessage, {to: "string"})
          } else {
            uncompressedMessage = lzString.decompressFromBase64(unparsedMessage)
          }
        }
        const message = JSON.parse(uncompressedMessage)
        unparseable[authTokenKey] = ""
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
      console.log("COULDN'T PARSE", e)
      if (unparseable[authTokenKey] == null) {
        unparseable[authTokenKey] = ""
      }
      unparseable[authTokenKey] += toSplit
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
