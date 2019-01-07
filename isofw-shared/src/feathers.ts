import * as feathers from "@feathersjs/feathers"
import restClient from "@feathersjs/rest-client"
import socketio from "@feathersjs/socketio-client"
import "isomorphic-fetch"
import { isNil } from "lodash"
import * as sio from "socket.io-client"

const f: any = feathers
const io: any = sio
export interface IFeathersClientHolder {
  client: any
  connectTo: (url: string) => void
  disconnect: () => void
}

const ClientHolder: IFeathersClientHolder = {
  client: null,
  connectTo: (url: string, rest?: boolean) => {
    const app = f()
    if (rest) {
      app.configure(restClient(url).fetch(fetch))
    } else {
      app.configure(socketio(io(url)))
    }
    ClientHolder.client = app
  },
  disconnect: (useRest?: boolean) => {
    const oldClient = ClientHolder.client
    if (!isNil(oldClient) && oldClient.io) {
      oldClient.io.disconnect()
    }
    ClientHolder.client = null
  }
}

export default ClientHolder
