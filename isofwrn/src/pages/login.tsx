import { AuthForm, MailField, PwField, useAuth } from "isofw-shared/src/util/xpfwdata"
import { SharedField } from "isofw-shared/src/util/xpfwform"
import NativeButton from "isofwrn/src/components/button"
import TranslatedText from "isofwrn/src/components/i18n"
import { MenuList } from "isofwrn/src/components/menu"
import NativePageContained from "isofwrn/src/components/pageContainer"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text, View } from "react-native"

const LogInPage: React.FunctionComponent<{}> = observer((props) => {
  const authProps = useAuth()
  return (
    <NativePageContained {...props} title="log in">
      {authProps.loggedIn ? (
        <View>
          <TranslatedText text="login.navigate" />
          <MenuList />
          <TranslatedText text="login.logout" />
        </View>
      ) : (
        <View>
          <TranslatedText text="login.ask" />
          <Text>{MailField.title} vs {PwField.title} {AuthForm.title}</Text>
          <SharedField schema={MailField} prefix={AuthForm.title} />
          <SharedField schema={PwField} prefix={AuthForm.title} />
        </View>
      )}
      <NativeButton
        title={authProps.loggedIn ? "logout" : "login"}
        onPress={authProps.loggedIn ? authProps.submitLogout : authProps.submitLogin}
        loading={authProps.loading}
        disabled={authProps.loading}
      />
      {authProps.loggedIn ? undefined :
        <NativeButton
          title={"register"}
          onPress={authProps.submitRegister}
          loading={authProps.loading}
          disabled={authProps.loading}
        />
      }
    </NativePageContained>
  )
})

export default LogInPage
