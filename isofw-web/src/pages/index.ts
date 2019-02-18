import urls from "isofw-shared/src/globals/url"
import Home from "isofw-web/src/pages/home"

const routeResolver: any = (fetcher: any) => {
  return async (routeTo: any, routeFrom: any, resolve: any) => {
    const resolved = await fetcher()
    resolve({component: resolved.default})
  }
}

const routes: any = [
  {
    path: urls.home,
    component: Home
  }, {
    path: urls.login,
    async: routeResolver(() => import("./login"))
  }
  // {
  //   path: `${urls.projectOverview}`,
  //   async: routeResolver(() => import("./project/overview"))
  // }, {
  //   path: `${urls.directorPage}/:id`,
  //   async: routeResolver(() => import("./project/directorSheet"))
  // }, {
  //   path: `${urls.programPage}/:id`,
  //   async: routeResolver(() => import("./project/program"))
  // }, {
  //   path: `${urls.operatorInfo}/:id`,
  //   async: routeResolver(() => import("./project/operatorInfo"))
  // }, {
  //   path: `${urls.cameraOverview}`,
  //   async: routeResolver(() => import("./camera/overview"))
  // }, {
  //   path: `${urls.create}/:collection`,
  //   async: routeResolver(() => import("./collections/create"))
  // }, {
  //   path: `${urls.edit}/:collection/:id`,
  //   async: routeResolver(() => import("./collections/edit"))
  // }
]

export default routes
