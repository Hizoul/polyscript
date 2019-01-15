import * as React from "react"
import { SharedFormAuth, IFormAuthProps } from "@xpfw/ui-shared"
import Loading from "./loading";
import { HashRouter, Route, Switch } from "react-router-dom"
import collections from "isofw-shared/src/xpfwDefs/collections"
import urls from "isofw-shared/src/globals/url";
import { App, Statusbar, View, Page, Navbar, Toolbar, Link, NavRight, Block, Subnavbar } from 'framework7-react';
export interface IPageContainer {
  requireLoggedIn?: boolean
  name: string
  title: string
  subtitle?: string
  subContent?: any
}

class WebPageContainer extends React.Component<IPageContainer & IFormAuthProps, any> {
  public render() {
    return (
      <Page name={this.props.name}>
        <Navbar
          title={this.props.title}
          subtitle={this.props.subtitle}
        >
          <NavRight>
            <Link panelOpen="left" iconFa="bars"/>
          </NavRight>
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
