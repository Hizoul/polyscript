import * as i18next from "i18next"
import * as sprintf from "i18next-sprintf-postprocessor"
import val from "isofw-shared/src/globals/val"

const i18nA: any = i18next
// TODO: fix for react native
const toInitWith: any = {init: () => {t: () => "bla"}}

const i18n = toInitWith.init({
  lng: "en",
  ns: [val.i18nNameSpace],
  overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
  defaultNS: val.i18nNameSpace,
  initImmediate: true,
  resources: {
    en: {
      main: {
        home: "Home",
        loggedInNavigate: "Already logged in. Do you want to navigate somewhere?",
        loggedInLogout: "Or do you wish to log out?",
        askLogin: "Please log in"
      }
    }
  }
})

export default i18n
