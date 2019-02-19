import { AuthForm, MailField, PwField, UserStore } from "@xpfw/data"
import { useFieldWithValidation } from "@xpfw/form"
import { testUsers } from "isofw-shared/src/testUtil/data/users"

const mailHelper = useFieldWithValidation(MailField, undefined, AuthForm.title)
const pwHelper = useFieldWithValidation(MailField, undefined, AuthForm.title)
const logIntoUser = async (userIndex: number = 0) => {
  const userToUse = testUsers[userIndex]
  mailHelper.setValue(userToUse[String(MailField.title)])
  pwHelper.setValue(userToUse[String(PwField.title)])
  await UserStore.login()
}

export default logIntoUser
