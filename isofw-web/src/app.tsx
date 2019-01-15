import "isofw-shared/src/xpfwDefs"
import "isofw-web/src/backendConnection"
import * as React from "react"
import routes from './pages';
import 'framework7/css/framework7.min.css';
import 'framework7/css/framework7.ios.min.css';
import Framework7 from 'framework7/framework7.esm.bundle.js';
import Framework7React, { App, View,  Panel, Page, Block, List, ListItem } from 'framework7-react';
import "@fortawesome/fontawesome-free/css/all.css"
import MenuPanel from "./components/menuPanel"
// Init F7-React Plugin
Framework7.use(Framework7React)

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

const AppRouter = (props: any) => (
  <App params={f7params}>
    <MenuPanel />
    <View main url="/" pushState={true} />
  </App>
)

export default AppRouter
