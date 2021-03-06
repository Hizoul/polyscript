import { MailField, PwField } from "@xpfw/data"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"

const testUsers = [
  {_id: "u1", [String(MailField.title)]: "u1", [String(PwField.title)]: "u1"},
  {_id: "u2", [String(MailField.title)]: "u2", [String(PwField.title)]: "u2"},
  {_id: "u3", [String(MailField.title)]: "u3", [String(PwField.title)]: "u3"}
]

const createTestUsers = async (app: any) => {
  const newUsers = []
  for (const newUser of testUsers) {
    newUsers.push(await app.service(val.service.user).create(newUser, isServerParams))
  }
  return newUsers
}

export default createTestUsers
export {
  testUsers
}
