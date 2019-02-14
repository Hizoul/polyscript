import urls from "./url"
import val from "./val"

export interface IconConfig {
  name: string
  type?: string
}
export interface MenuEntry {
  title: string
  link: string
  icon: IconConfig
}
const menuLoggedIn: MenuEntry[] = [
  {title: "Home", link: urls.home, icon: {name: "home"}},
  {title: "Projects", link: urls.projectOverview, icon: {name: "folder"}},
  {title: "Cameras", link: urls.cameraOverview, icon: {name: "camera-retro", type: "font-awesome"}},
  {title: "Logout", link: urls.login, icon: {name: "sign-out", type: "font-awesome"}}
]
const menuLoggedOut: MenuEntry[] = [
  {title: "Home", link: urls.home, icon: {name: "home"}},
  {title: "Login", link: urls.login, icon: {name: "sign-in", type: "font-awesome"}}
]
export {
  menuLoggedOut, menuLoggedIn
}
