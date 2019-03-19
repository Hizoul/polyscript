import val from "isofw-shared/src/globals/val"
import { dataOptions } from "isofw-shared/src/util/xpfwdata"
import { get, isString } from "lodash"

let unparseable = ""
const tries = 0

const clientMessageHandler = (data: any, promises: any, options: any, giveOriginal?: boolean, retried?: boolean) => {
  const toSplit = isString(data) ? data : data.toString("utf8")
  const messages = toSplit.split(val.network.packetDelimiter)
  for (const unparsedMessage of messages) {
    if (unparsedMessage.length > 0) {
      try {
        const message = JSON.parse(unparsedMessage)
        unparseable = ""
        if (promises[message.trackId]) {
          if (promises[message.trackId] === -1) {
            const dbStore = get(options, "dbStore")
            if (dbStore != null) {
              const isRemoved = get(message, `method`) === "removed"
              const result = get(message, `result`)
              dbStore.setItem(get(result, dataOptions.idPath), get(message, `collection`), isRemoved ? null : result)
            }
          } else {
            if (message.error) {
              promises[message.trackId].reject(giveOriginal === true ? message : message.error)
            } else {
              promises[message.trackId].resolve(giveOriginal === true ? message : message.result)
            }
            delete promises[message.trackId]
          }
        }
      } catch (e) {
        if (!retried) {
          unparseable += unparsedMessage
          console.log("UNPARSEABLE NOW", unparseable.length)
          if (unparseable.length > 100000) {
            console.log("LAST PART OF UNPARSEABLE IS", unparseable.substring(
              unparseable.length - 100, unparseable.length
            ))
            console.log("PARSERRRO IS", e)
          }
        }
      }
    }
  }
  if (unparseable.length > 0 && !retried) {
    clientMessageHandler(unparseable, promises, options, giveOriginal, true)
  }
}

export default clientMessageHandler
