import "@fortawesome/fontawesome-free/css/all.css"
import Framework7React, { App, Block,  List, ListItem, Page, Panel, View } from "framework7-react"
import "framework7/css/framework7.ios.min.css"
import "framework7/css/framework7.min.css"
import Framework7 from "framework7/framework7.esm.bundle.js"
import "isofw-shared/src/xpfwDefs"
import "isofw-web/src/backendConnection"
import * as React from "react"
import MenuPanel from "./components/menuPanel"
import routes from "./pages"
// Init F7-React Plugin
Framework7.use(Framework7React)

const f7params = {
  // Array with app routes
  routes,
  // App Name
  name: "My App",
  theme: "ios",
  // App id
  id: "com.myapp.test"
  // ...
}

const AppRouter = (props: any) => (
  <App params={f7params}>
    <MenuPanel />
    <View main={true} url="/" pushState={true} />
  </App>
)

export default AppRouter
