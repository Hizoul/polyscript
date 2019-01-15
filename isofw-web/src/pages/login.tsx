import "isofw-web/src/components/form"

import { SharedField } from "@xpfw/form-shared"
import { IFormAuthProps, MailField, PwField, SharedFormAuth } from "@xpfw/ui-shared"
import WebButton from "isofw-web/src/components/button"
import { get } from "lodash"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import { List, BlockTitle, Block, Icon } from "framework7-react";

class WebLogin extends React.Component<IFormAuthProps, any> {
  public render() {
    let msg
    if (this.props.error) {
      msg = (
        <div className="notification is-danger">
          {get(this.props, "error.message", "Error")}
        </div>
      )
    }
    if (this.props.loggedIn) {
      return (
        <WebPageContainer name="login" title="logout">
          <div className="miniContainer pullIntoHero">
            <div className="box">
              <WebButton
                className="is-primary is-fullwidth"
                onClick={this.props.submitLogout}
                loading={this.props.loading}
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
      <WebPageContainer name="login" title="login">
      <BlockTitle>Enter log in details</BlockTitle>
        <List form>
          <ul>
          <SharedField field={MailField} />
          <SharedField field={PwField} />
          </ul>
        </List>
        <WebButton
          className="is-primary is-fullwidth"
          onClick={this.props.submitLogin}
          loading={this.props.loading}
          text="login"
          iconFa="sign-in-alt"
          fill
        />
        <WebButton
          className="marginTop is-info is-outlined is-fullwidth"
          onClick={this.props.submitRegister}
          loading={this.props.loading}
          text="register"
          iconFa="plus"
        />
            {msg}
      </WebPageContainer>
    )
  }
}
const WrappedWebLogin = SharedFormAuth<{}>(WebLogin)
export default WrappedWebLogin
