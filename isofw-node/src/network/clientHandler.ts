const clientMessageHandler = (data: any, promises: any) => {
  if (promises[data.trackId]) {
    promises[data.trackId].resolve(data.result)
    delete promises[data.trackId]
  }
}

export default clientMessageHandler
