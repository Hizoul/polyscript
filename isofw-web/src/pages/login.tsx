import "isofw-web/src/components/form"

import { SharedField } from "@xpfw/form-shared"
import { IFormAuthProps, MailField, PwField, SharedFormAuth } from "@xpfw/ui-shared"
import { Block, BlockTitle, Icon, List } from "framework7-react"
import WebButton from "isofw-web/src/components/button"
import TranslatedText from "isofw-web/src/components/i18n"
import { WrappedMenuEntries } from "isofw-web/src/components/menuPanel"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import { get } from "lodash"
import * as React from "react"

const WebLogin: React.FunctionComponent<IFormAuthProps> = (props) => {

  let msg
  if (props.error) {
    msg = (
      <div className="notification is-danger">
        {get(props, "error.message", "Error")}
      </div>
    )
  }
  if (props.loggedIn) {
    return (
      <WebPageContainer name="login" title="logout" backLink={true}>
        <div className="miniContainer pullIntoHero">
          <div className="box">
            <WebButton
              className="is-primary is-fullwidth"
              onClick={props.submitLogout}
              loading={props.loading}
              text="logout"
              iconFa="sign-out-alt"
            />
            {msg}
          </div>
        </div>
      </WebPageContainer>
    )
  }
  return (
    <WebPageContainer name="login" title="login" backLink={true}>
    <BlockTitle>
      <TranslatedText text={props.loggedIn ? "loggedInNavigate" : "askLogin"} />
    </BlockTitle>
    {props.loggedIn ? (
      <div>
      <WrappedMenuEntries />
        <BlockTitle><TranslatedText text="loggedInLogout" /></BlockTitle>
      </div>
    ) : (
      <List form={true}>
        <ul>
        <SharedField field={MailField} />
        <SharedField field={PwField} />
        </ul>
      </List>
    )}
    <WebButton
      className="is-primary is-fullwidth"
      onClick={props.loggedIn ? props.submitLogout : props.submitLogin}
      loading={props.loading}
      text="login"
      iconFa="sign-in-alt"
      fill={true}
    />
    {props.loggedIn ? null : (
      <WebButton
        className="marginTop is-info is-outlined is-fullwidth"
        onClick={props.submitRegister}
        loading={props.loading}
        text="register"
        iconFa="plus"
      />
    )}
    {msg}
    </WebPageContainer>
  )
}

const WrappedWebLogin = SharedFormAuth<{}>(WebLogin)
export default WrappedWebLogin
