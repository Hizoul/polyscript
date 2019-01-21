
import * as authentication from "@feathersjs/authentication"

const auth: any = authentication

const requireAuthentication = {
  before: {
    create: [
      auth.hooks.authenticate("jwt")
    ],
    update: [
      auth.hooks.authenticate("jwt")
    ],
    get: [
      auth.hooks.authenticate("jwt")
    ],
    find: [
      auth.hooks.authenticate("jwt")
    ],
    patch: [
      auth.hooks.authenticate("jwt")
    ],
    remove: [
      auth.hooks.authenticate("jwt")
    ]
  }
}

export default requireAuthentication
