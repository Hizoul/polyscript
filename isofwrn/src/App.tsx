import urls from "isofw-shared/src/globals/url"
import "isofwrn/src/backendConnection"
import "isofwrn/src/components/form"
import { createAppContainer, createDrawerNavigator, createStackNavigator } from "react-navigation"
import MenuPanel from "./components/menu"
import NativeCameraOverview from "./pages/camera/overview"
import NativeCreatePage from "./pages/collection/create"
import NativeEditPage from "./pages/collection/edit"
import HomePage from "./pages/home"
import LogInPage from "./pages/login"
import NativeDirectorPage from "./pages/project/directorSheet"
import NativeOperatorInfo from "./pages/project/operatorInfo"
import NativeProjectOverview from "./pages/project/overview"
import NativeProgramPage from "./pages/project/program"

const drawerConfig: any = {
  contentComponent: MenuPanel
}

const navigated = createDrawerNavigator({
  root: {
    screen: createStackNavigator({
      [urls.home]: {screen: HomePage},
      [urls.login]: {screen: LogInPage},
      [urls.cameraOverview]: {screen: NativeCameraOverview},
      [urls.projectOverview]: {screen: NativeProjectOverview},
      [urls.operatorInfo]: {screen: NativeOperatorInfo},
      [urls.create]: {screen: NativeCreatePage},
      [urls.edit]: {screen: NativeEditPage},
      [urls.directorPage]: {screen: NativeDirectorPage},
      [urls.programPage]: {screen: NativeProgramPage}
    }, {
      headerMode: "none"
    })
  }
}, drawerConfig)

export default createAppContainer(navigated)
