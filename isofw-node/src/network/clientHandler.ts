import val from "isofw-shared/src/globals/val"
import { dataOptions } from "isofw-shared/src/util/xpfwdata"
import { get, isString } from "lodash"

const clientMessageHandler = (data: any, promises: any, options: any) => {
  const toSplit = isString(data) ? data : data.toString("utf8")
  const messages = toSplit.split(val.network.packetDelimiter)
  for (const unparsedMessage of messages) {
    if (unparsedMessage.length > 0) {
      const message = JSON.parse(unparsedMessage)
      if (promises[message.trackId]) {
        if (promises[message.trackId] === -1) {
          const dbStore = get(options, "dbStore")
          if (dbStore != null) {
            const isRemoved = get(message, `method`) === "removed"
            const result = get(message, `result`)
            dbStore.setItem(get(result, dataOptions.idPath), get(message, `collection`), isRemoved ? null : result)
          }
        } else {
          promises[message.trackId].resolve(message.result)
          delete promises[message.trackId]
        }
    }
    }
  }
}

export default clientMessageHandler
