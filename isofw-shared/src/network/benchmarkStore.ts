import { BackendClient } from "@xpfw/data"
import { get, set } from "lodash"
import { action, observable } from "mobx"
import causeProjectTraffic from "./causeProjectTraffic"

/**
 * Holds data relevant for Forms such as values and validation errors
 */
export class BenchmarkStoreClass {
  @observable
  public loading: boolean = false
  @observable
  public total: number = 0
  @observable
  public currentlyAt: number = 0
  @observable
  public programSize: number = 500
  @observable
  public uploaded: boolean = false
  @observable
  public parallel: boolean = false

  public causeProjectTraffic(projectId: string) {
    return () => {
      const client: any = BackendClient.client
      causeProjectTraffic(client, projectId)
    }
  }
}

const BenchmarkStore = new BenchmarkStoreClass()
export default BenchmarkStore
