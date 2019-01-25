import { MailField, PwField } from "@xpfw/ui-shared"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"

const testUsers = [
  {_id: "u1", [MailField.mapTo]: "u1", [PwField.mapTo]: "u1"},
  {_id: "u2", [MailField.mapTo]: "u2", [PwField.mapTo]: "u2"},
  {_id: "u3", [MailField.mapTo]: "u3", [PwField.mapTo]: "u3"}
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
