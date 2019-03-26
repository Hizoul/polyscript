export interface IQueueEntry<T> {
  resolve: Function
  reject: Function
  data: T
}

class Queue<T> {
  public waitTime = 5
  private queueHandler: (entry: IQueueEntry<T>) => Promise<any>
  private queueTimeoutId: any
  private queue: Array<IQueueEntry<T>> = []
  public constructor(queueHandler: (entry: IQueueEntry<T>) => Promise<any>) {
    this.queueHandler = queueHandler
  }
  public queueCall = (data: T) => {
    return new Promise((resolve, reject) => {
      if (this.queueTimeoutId != null) {
        clearTimeout(this.queueTimeoutId)
        this.queueTimeoutId = undefined
      }
      this.queue.push({resolve, reject, data})
      this.queueTimeoutId = setTimeout(() => this.clearQueue(), this.waitTime)
    })
  }
  private clearQueue = async () => {
    const toClear: any[] = []
    while (this.queue.length > 0) {
      toClear.push(this.queue.pop())
    }
    this.queueTimeoutId = undefined
    for (const item of toClear) {
      try {
        await this.queueHandler(item)
      } catch (e) {}
    }
  }
}

export default Queue
