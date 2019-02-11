import urls from "isofw-shared/src/globals/url"
import "isofwrn/src/backendConnection"
import "isofwrn/src/components/form"
import { createAppContainer, createDrawerNavigator } from "react-navigation"
import MenuPanel from "./components/menu"
import NativeCameraOverview from "./pages/camera/overview"
import HomePage from "./pages/home"
import LogInPage from "./pages/login"
import NativeProjectOverview from "./pages/project/overview"

const navigated = createDrawerNavigator({
  [urls.home]: {screen: HomePage},
  [urls.login]: {screen: LogInPage},
  [urls.cameraOverview]: {screen: NativeCameraOverview},
  [urls.projectOverview]: {screen: NativeProjectOverview}
}, {
  contentComponent: MenuPanel
})

export default createAppContainer(navigated)
