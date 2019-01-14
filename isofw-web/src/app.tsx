import "isofw-shared/src/xpfwDefs"
import "isofw-web/src/backendConnection"

import Home from "isofw-web/src/pages/home"
import {
  LoadableCreatePage, LoadableEditPage,
  LoadableListPage,
  LoadableLoginPage,
  LoadableDirectorPage,
  LoadableProgramPage,
  LoadableProjectOverview
} from "isofw-web/src/pages/loadable"
import * as React from "react"
import pose, { PoseGroup } from "react-pose"
import { HashRouter, Link, Route, Switch } from "react-router-dom"
import urls from "isofw-shared/src/globals/url";
import routes from './pages';
import 'framework7/css/framework7.min.css';
import 'framework7/css/framework7.ios.min.css';
import Framework7 from 'framework7';
import Framework7React, { App, View } from 'framework7-react';
import "@fortawesome/fontawesome-free/css/all.css"
// Init F7-React Plugin
Framework7.use(Framework7React);

const RouteContainer = pose.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
})

const f7params = {
  // Array with app routes
  routes,
  // App Name
  name: 'My App',
  theme: "ios",
  // App id
  id: 'com.myapp.test',
  // ...
};

const AppRouter = () => (
  <App params={f7params}>
    <View main url="/" pushState={true} />
  </App>
)

export default AppRouter
