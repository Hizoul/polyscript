import "isofw-web/src/components/form"

import { SharedField } from "@xpfw/form-shared"
import { IFormAuthProps, MailField, PwField, SharedFormAuth } from "@xpfw/ui-shared"
import WebButton from "isofw-web/src/components/button"
import { get } from "lodash"
import * as React from "react"
import "isofw-web/src/customizedBulma.sass"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import { FaPlus, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

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
                icon={<FaSignOutAlt />}
                rightIcon={true}
              />
              {msg}
            </div>
          </div>
        </WebPageContainer>
      )
    }
    return (
      <WebPageContainer name="login" title="login">
        <div className="miniContainer pullIntoHero">
          <div className="box">
            <SharedField field={MailField} />
            <SharedField field={PwField} />
            <WebButton
              className="is-primary is-fullwidth"
              onClick={this.props.submitLogin}
              loading={this.props.loading}
              text="login"
              icon={<FaSignInAlt />}
              rightIcon={true}
            />
            <WebButton
              className="marginTop is-info is-outlined is-fullwidth"
              onClick={this.props.submitRegister}
              loading={this.props.loading}
              text="register"
              icon={<FaPlus />}
              rightIcon={true}
            />
            {msg}
          </div>
        </div>
      </WebPageContainer>
    )
  }
}
const WrappedWebLogin = SharedFormAuth<{}>(WebLogin)
export default WrappedWebLogin
