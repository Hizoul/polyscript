import * as React from "react"
import { SharedFormAuth, IFormAuthProps } from "@xpfw/ui-shared"
import Loading from "./loading";
import { HashRouter, Route, Switch } from "react-router-dom"
import collections from "isofw-shared/src/xpfwDefs/collections"
import urls from "isofw-shared/src/globals/url";
import { App, Statusbar, View, Page, Navbar, Toolbar, Link } from 'framework7-react';
export interface IPageContainer {
  requireLoggedIn?: boolean
  name: string
  title: string
  subtitle?: string
}

class WebPageContainer extends React.Component<IPageContainer & IFormAuthProps, any> {
  public render() {
    if (this.props.requireLoggedIn && !this.props.loggedIn) {
      return (
        <Page name={this.props.name}>
          {this.props.loading ? <Loading /> : null}
          Je moet ingeloggt zijn om dit te zien.
        </Page>
      )
    }
    return (
      <Page name={this.props.name}>
        <Navbar title={this.props.title} subtitle={this.props.subtitle}></Navbar>
        <Link href="/">Home</Link>
        <Link href="/login">Login</Link>
        <Link href={`${urls.projectOverview}`}>Project list</Link>
        {this.props.children}
      </Page>
    )
  }
}



export default SharedFormAuth<IPageContainer>(WebPageContainer)
