import val from "isofw-shared/src/globals/val"
import { unpackMessage } from "isofw-shared/src/network/compression"
import { dataOptions } from "isofw-shared/src/util/xpfwdata"
import { get, isString } from "lodash"

let unparseable = ""
const tries = 0

const clientMessageHandler = (data: any, promises: any, options: any, giveOriginal?: boolean, retried?: boolean) => {
  const toSplit = isString(data) ? data : data.toString("utf8")
  const messages = toSplit.split(val.network.packetDelimiter)
  let cuttableSuccessLength = 0
  try {
  for (const unparsedMessage of messages) {
    console.log("trying to parse", unparsedMessage.length)
    if (unparsedMessage.length > 0) {
      const message = JSON.parse(unpackMessage(unparsedMessage))
      if (message == null) {
        throw new Error("MSG IS NULL")
      }
      unparseable = unparseable.substring(unparsedMessage.length + val.network.packetDelimiter.length)
      cuttableSuccessLength += unparsedMessage.length + val.network.packetDelimiter.length
      console.log("AFTER SUCCESSFUL PARSE IS", unparseable.length)
      console.log("MSSG IS", message.trackId)
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
            console.log("REJECTIN GMSG", message.trackId)
            promises[message.trackId].reject(giveOriginal === true ? message : message.error)
          } else {
            console.log("RESOLVING MSG", message.trackId)
            promises[message.trackId].resolve(giveOriginal === true ? message : message.result)
          }
          delete promises[message.trackId]
        }
      }
    }
  }
  } catch (e) {
    console.log("ERROR PARSING", e, toSplit.substring(toSplit.length - 30, toSplit.length - 1))
    if (!retried) {
      unparseable += cuttableSuccessLength > 0 ? toSplit.substring(cuttableSuccessLength) : toSplit
      console.log("UNPARSEABLE IS NOW", unparseable.substring(unparseable.length - 30, unparseable.length - 1))
    }
  }
  if (unparseable.length > 0 && !retried) {
    console.log("retrying with", unparseable.substring(unparseable.length - 30, unparseable.length - 1))
    clientMessageHandler(unparseable, promises, options, giveOriginal, true)
  }
}

export default clientMessageHandler
