import { registerComponents as rg} from "@xpfw/form-web"
rg()
import { registerComponents } from "@xpfw/form-bulma"
registerComponents()
import { registerComponents as uiComponents } from "@xpfw/ui-bulma"
uiComponents()

import { SharedField } from "@xpfw/form-shared"
import { IFormAuthProps, MailField, PwField, SharedFormAuth } from "@xpfw/ui-shared"
import WebButton from "isofw-web/src/components/button"
import { get } from "lodash"
import * as React from "react"
import "isofw-web/src/customizedBulma.sass"

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
        <div>
          <div className="miniContainer pullIntoHero">
            <div className="box">
              <WebButton
                className="is-primary is-fullwidth"
                onClick={this.props.submitLogout}
                loading={this.props.loading}
                text="logout"
                icon={{type: "font-awesome", name: "sign-out-alt"}}
                rightIcon={true}
              />
              {msg}
            </div>
          </div>
        </div>
      )
    }
    return (
      <div>
        <div className="miniContainer pullIntoHero">
          <div className="box">
            <SharedField field={MailField} />
            <SharedField field={PwField} />
            <WebButton
              className="is-primary is-fullwidth"
              onClick={this.props.submitLogin}
              loading={this.props.loading}
              text="login"
              icon={{type: "font-awesome", name: "sign-in-alt"}}
              rightIcon={true}
            />
            <WebButton
              className="marginTop is-info is-outlined is-fullwidth"
              onClick={this.props.submitRegister}
              loading={this.props.loading}
              text="register"
              icon={{type: "font-awesome", name: "plus"}}
              rightIcon={true}
            />
            {msg}
          </div>
        </div>
      </div>
    )
  }
}
const WrappedWebLogin = SharedFormAuth<{}>(WebLogin)
export default WrappedWebLogin
