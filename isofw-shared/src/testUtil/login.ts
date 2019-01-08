import { FormStore } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "@xpfw/ui-shared"
import { testUsers } from "isofw-shared/src/testUtil/data/users"

const logIntoUser = async (userIndex: number = 0) => {
  const userToUse = testUsers[userIndex]
  FormStore.setValue(MailField.mapTo, userToUse[MailField.mapTo])
  FormStore.setValue(PwField.mapTo, userToUse[PwField.mapTo])
  await UserStore.login()
}

export default logIntoUser
