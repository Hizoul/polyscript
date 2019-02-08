import urls from "isofw-shared/src/globals/url"
import "isofwrn/src/components/form"
import { createAppContainer, createDrawerNavigator } from "react-navigation"
import MenuPanel from "./components/menu"
import HomePage from "./pages/home"
import LogInPage from "./pages/login"

const navigated = createDrawerNavigator({
  [urls.home]: {screen: HomePage},
  [urls.login]: {screen: LogInPage}
}, {
  contentComponent: MenuPanel
})

export default createAppContainer(navigated)
