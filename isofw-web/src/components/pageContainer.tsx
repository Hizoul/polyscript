import * as React from "react"
import { SharedFormAuth, IFormAuthProps } from "@xpfw/ui-shared"
import Loading from "./loading";
import { HashRouter, Link, Route, Switch } from "react-router-dom"
import collections from "isofw-shared/src/xpfwDefs/collections"
import urls from "isofw-shared/src/globals/url";
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
      <div className="flex1 column">
        <ul id="site-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to={`${urls.projectOverview}`}>Project list</Link>
          </li>
          {collections.map((col) => {
            return [
              <li key={`create${col}`}>
                <Link to={`/create/${col}`}>Create {col}</Link>
              </li>,
              <li key={`list${col}`}>
                <Link to={`/list/${col}`}>List {col}</Link>
              </li>
            ]
          })}
        </ul>
        {this.props.children}
      </div>
    )
  }
}



export default SharedFormAuth<IPageContainer>(WebPageContainer)
