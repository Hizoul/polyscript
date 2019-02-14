import urls from "isofw-shared/src/globals/url"
import "isofwrn/src/backendConnection"
import "isofwrn/src/components/form"
import { createAppContainer, createDrawerNavigator, createStackNavigator } from "react-navigation"
import MenuPanel from "./components/menu"
import NativeCameraOverview from "./pages/camera/overview"
import NativeEditPage from "./pages/collection/edit"
import HomePage from "./pages/home"
import LogInPage from "./pages/login"
import NativeOperatorInfo from "./pages/project/operatorInfo"
import NativeProjectOverview from "./pages/project/overview"

const navigated = createDrawerNavigator({
  root: {
    screen: createStackNavigator({
      [urls.home]: {screen: HomePage},
      [urls.login]: {screen: LogInPage},
      [urls.cameraOverview]: {screen: NativeCameraOverview},
      [urls.projectOverview]: {screen: NativeProjectOverview},
      [urls.operatorInfo]: {screen: NativeOperatorInfo},
      [urls.edit]: {screen: NativeEditPage}
    }, {
      headerMode: "none"
    })
  }
}, {
  contentComponent: MenuPanel
})

export default createAppContainer(navigated)
