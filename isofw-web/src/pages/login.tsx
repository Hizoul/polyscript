import "isofw-web/src/components/form"

import { AuthForm, MailField, PwField, useAuth } from "@xpfw/data"
import { SharedField } from "@xpfw/form"
import { BlockTitle, List } from "framework7-react"
import WebButton from "isofw-web/src/components/button"
import TranslatedText from "isofw-web/src/components/i18n"
import { MenuEntries } from "isofw-web/src/components/menuPanel"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const WebLogin: React.FunctionComponent<any> = (props) => {
  const authProps = useAuth()
  let msg
  if (authProps.error) {
    msg = (
      <div className="notification is-danger">
        {get(props, "error.message", "Error")}
      </div>
    )
  }
  return (
    <WebPageContainer name="login" title="login" backLink={true}>
    <BlockTitle>
      <TranslatedText text={authProps.loggedIn ? "loggedInNavigate" : "askLogin"} />
    </BlockTitle>
    {authProps.loggedIn ? (
      <div>
        <MenuEntries />
        <BlockTitle><TranslatedText text="loggedInLogout" /></BlockTitle>
      </div>
    ) : (
      <List form={true}>
        <ul>
        <SharedField schema={MailField} prefix={AuthForm.title} />
        <SharedField schema={PwField} prefix={AuthForm.title} />
        </ul>
      </List>
    )}
    <WebButton
      className="is-primary is-fullwidth"
      onClick={authProps.loggedIn ? authProps.submitLogout : authProps.submitLogin}
      loading={authProps.loading}
      text={authProps.loggedIn ? "logout" : "login"}
      iconFa="sign-in-alt"
      fill={true}
    />
    {authProps.loggedIn ? null : (
      <WebButton
        className="marginTop is-info is-outlined is-fullwidth"
        onClick={authProps.submitRegister}
        loading={authProps.loading}
        text="register"
        iconFa="plus"
      />
    )}
    {msg}
    </WebPageContainer>
  )
}

const WrappedWebLogin = observer(WebLogin)
export default WrappedWebLogin
