import { FieldType, IField } from "@xpfw/validate"

const IDField: IField = {
  type: FieldType.Text,
  mapTo: "_id"
}

const IsActiveField: IField = {
  type: FieldType.Boolean,
  mapTo: "isActive"
}

export {
  IDField, IsActiveField
}
