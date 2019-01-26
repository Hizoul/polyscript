import { FieldType, IField } from "@xpfw/validate"

const IDField: IField = {
  type: FieldType.Text,
  mapTo: "_id",
  validate: {
    hide: {create: false, update: false}
  }
}

export {
  IDField
}
