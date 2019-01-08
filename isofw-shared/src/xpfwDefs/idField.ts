import ValidationRegistry, { IForm, Permission, IField, FieldType } from "@xpfw/validate"

const IDField: IField = {
  type: FieldType.Text,
  mapTo: "_id"
}

export default IDField