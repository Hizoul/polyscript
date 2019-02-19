import { ExtendedJSONSchema } from "@xpfw/form"

const IDField: ExtendedJSONSchema = {
  type: "string",
  title: "_id",
  hide: {create: false, update: false}
}

export {
  IDField
}
