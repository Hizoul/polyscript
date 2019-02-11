import { SharedField } from "isofw-shared/src/util/xpfwformshared"
import { IFormAuthProps, MailField, PwField, SharedFormAuth } from "isofw-shared/src/util/xpfwuishared"
import NativeButton from "isofwrn/src/components/button"
import TranslatedText from "isofwrn/src/components/i18n"
import { WrappedMenuDisplayer } from "isofwrn/src/components/menu"
import NativePageContained from "isofwrn/src/components/pageContainer"
import * as React from "react"
import { Text, View } from "react-native"

const LogInPage: React.FunctionComponent<IFormAuthProps> = (props) => {
  return (
    <NativePageContained {...props} title="log in">
      {props.loggedIn ? (
        <View>
          <TranslatedText text="loggedInNavigate" />
          <WrappedMenuDisplayer />
          <TranslatedText text="loggedInLogout" />
        </View>
      ) : (
        <View>
          <TranslatedText text="askLogin" />
          <SharedField field={MailField} />
          <SharedField field={PwField} />
        </View>
      )}
      <NativeButton
        title={props.loggedIn ? "logout" : "login"}
        onPress={props.loggedIn ? props.submitLogout : props.submitLogin}
        loading={props.loading}
        disabled={props.loading}
      />
    </NativePageContained>
  )
}

export default SharedFormAuth<{}>(LogInPage)
