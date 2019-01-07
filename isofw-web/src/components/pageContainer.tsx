import * as React from "react"
import { SharedFormAuth, IFormAuthProps } from "@xpfw/ui-shared"
import Loading from "./loading";

export interface IPageContainer {
  requireLoggedIn?: boolean
}

class WebPageContainer extends React.Component<IPageContainer & IFormAuthProps, any> {
  public render() {
    if (this.props.requireLoggedIn && !this.props.loggedIn) {
      return (
        <div>
          {this.props.loading ? <Loading /> : null}
          Je moet ingeloggt zijn om dit te zien.
        </div>
      )
    }
    return (
      <div>
        {this.props.children}
      </div>
    )
  }
}



export default SharedFormAuth<IPageContainer>(WebPageContainer)
