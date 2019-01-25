import ValidationRegistry, { FieldType, IField, IForm, Permission } from "@xpfw/validate"

const IDField: IField = {
  type: FieldType.Text,
  mapTo: "_id"
}

export default IDField
