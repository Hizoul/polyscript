import "isofw-shared/src/xpfwDefs"
import "isofw-web/src/backendConnection"

import collections from "isofw-shared/src/xpfwDefs/collections"
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
        <div id="site-container">
          <div id="content-container">
            <ul id="site-nav">
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
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
            <PoseGroup>
              <RouteContainer key={location.key ? location.key : "HA"}>
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
          </div>
        </div>
      )}
    />
  </HashRouter>
)

export default AppRouter
