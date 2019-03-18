import { get } from "lodash"
import { vsprintf } from "sprintf-js"

const translations = {
  home: "Home",
  loggedInNavigate: "Already logged in. Do you want to navigate somewhere?",
  loggedInLogout: "Or do you wish to log out?",
  askLogin: "Please log in",
  name: "Name",
  ip: "IP-Address",
  create: "Create",
  save: "Save",
  error: "Error",
  success: "Success",
  inputError: "Your Input is faulty and cannot be submitted. This is a list of the problems: %s",
  created: "Successfully created entry with ID %s",
  saved: "Successfully saved entry with ID %s"
}

const i18n: {
  language: string
  data: any,
  addTranslations: (lanugage: string, data: Object) => void,
  t: (key: string, ...args: any[]) => string
} = {
  language: "en",
  data: {
    en: translations
  },
  addTranslations: (language, data) => {
    Object.assign(i18n.data[language], data)
  },
  t: (key, args) => vsprintf(get(i18n.data[i18n.language], key, key), args)
}

export default i18n
