import { IFormAuthProps, SharedFormAuth } from "@xpfw/ui-shared"
import { App, Block, Link, Navbar, NavLeft, NavRight, NavTitle,
  Page, Statusbar, Subnavbar, Toolbar, View } from "framework7-react"
import urls from "isofw-shared/src/globals/url"
import collections from "isofw-shared/src/xpfwDefs/collections"
import * as React from "react"
import Loading from "./loading"

export interface IPageContainer {
  requireLoggedIn?: boolean
  name: string
  title: string
  subtitle?: string
  backLink?: any
  subContent?: any
}

class WebPageContainer extends React.Component<IPageContainer & IFormAuthProps, any> {
  public render() {
    return (
      <Page name={this.props.name}>
        <Navbar
        >
          <NavLeft>
            {this.props.backLink ? <Link back={true} iconFa="chevron-left" /> : null}
            <Link panelOpen="left" iconFa="bars" style={{marginLeft: "0pt"}} />
          </NavLeft>
          <NavTitle subtitle={this.props.subtitle} title={this.props.title} />
          {this.props.subContent ? (
            <Subnavbar inner={false}>
              {this.props.subContent}
            </Subnavbar>
          ) : undefined}
        </Navbar>
        {this.props.requireLoggedIn && !this.props.loggedIn ? (
          <Block>
            {this.props.loading ? <Loading /> : null}
            Je moet ingeloggt zijn om dit te zien.
          </Block>
        ) : this.props.children}
      </Page>
    )
  }
}

export default SharedFormAuth<IPageContainer>(WebPageContainer)
