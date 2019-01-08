import "isofw-shared/src/xpfwDefs"
import "isofw-web/src/backendConnection"

import Home from "isofw-web/src/pages/home"
import {
  LoadableCreatePage, LoadableEditPage,
  LoadableListPage,
  LoadableLoginPage,
  LoadableDirectorPage
} from "isofw-web/src/pages/loadable"
import * as React from "react"
import pose, { PoseGroup } from "react-pose"
import { HashRouter, Link, Route, Switch } from "react-router-dom"

const RouteContainer = pose.div({
  enter: { opacity: 1, delay: 300, beforeChildren: true },
  exit: { opacity: 0 }
})

const AppRouter = () => (
  <HashRouter>
    <Route
      render={({ location }) => (
        <PoseGroup>
          <RouteContainer className="flex1" key={location.key ? location.key : "HA"}>
            <Switch location={location}>
              <Route exact={true} path="/" component={Home} key="home" />
              <Route path="/login" component={LoadableLoginPage} key="login" />
              <Route path="/create/:collection" component={LoadableCreatePage} key="create" />
              <Route path="/list/:collection" component={LoadableListPage} key="list" />
              <Route path="/edit/:collection/:id" component={LoadableEditPage} key="edit" />
              <Route path="/director/:id" component={LoadableDirectorPage} key="director" />
            </Switch>
          </RouteContainer>
        </PoseGroup>
      )}
    />
  </HashRouter>
)

export default AppRouter
