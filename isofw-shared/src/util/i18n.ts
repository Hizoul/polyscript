import { get } from "lodash"
import { vsprintf } from "sprintf-js"

const translations = {
  home: "Home",
  loggedInNavigate: "Already logged in. Do you want to navigate somewhere?",
  loggedInLogout: "Or do you wish to log out?",
  askLogin: "Please log in"
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
