import { MailField, OwnerField, PwField } from "@xpfw/data"
import { ExtendedJSONSchema } from "@xpfw/form";
import val from "isofw-shared/src/globals/val"

const UserForm: ExtendedJSONSchema = {
  title: "userModel",
  collection: val.service.user,
  type: "object",
  properties: {
    [String(MailField.title)]: MailField,
    [String(PwField.title)]: PwField
  }
}

export default UserForm