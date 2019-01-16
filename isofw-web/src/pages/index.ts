import Home from "isofw-web/src/pages/home"
import urls from "isofw-shared/src/globals/url";
const routeResolver: any = (fetcher: any) => {
  return async (routeTo: any, routeFrom: any, resolve: any) => {
    const resolved = await fetcher()
    resolve({component: resolved.default})
  }
}

const routes: any = [
  {
    path: '/',
    component: Home
  },{
    path: '/login',
    async: routeResolver(() => import("./login"))
  },{
    path: `${urls.projectOverview}`,
    async: routeResolver(() => import("./project/overview"))
  },{
    path: `${urls.directorPage}/:id`,
    async: routeResolver(() => import("./project/directorSheet"))
  },{
    path: `${urls.programPage}/:id`,
    async: routeResolver(() => import("./project/program"))
  },{
    path: `${urls.operatorInfo}/:id`,
    async: routeResolver(() => import("./project/operatorInfo"))
  },{
    path: `${urls.cameraOverview}`,
    async: routeResolver(() => import("./camera/overview"))
  },{
    path: `${urls.create}/:collection`,
    async: routeResolver(() => import("./collections/create"))
  },{
    path: `${urls.edit}/:collection/:id`,
    async: routeResolver(() => import("./collections/edit"))
  }
]
              // <Route exact={true} path="/" component={Home} key="home" />
              // <Route path="/login" component={LoadableLoginPage} key="login" />
              // <Route path="/create/:collection" component={LoadableCreatePage} key="create" />
              // <Route path="/list/:collection" component={LoadableListPage} key="list" />
              // <Route path="/edit/:collection/:id" component={LoadableEditPage} key="edit" />
              // <Route path={`${urls.directorPage}/:id`} component={LoadableDirectorPage} key="director" />
              // <Route path={`${urls.programPage}/:id`} component={LoadableProgramPage} key="program" />
              // <Route path={`${urls.projectOverview}`} component={LoadableProjectOverview} key="project" />

export default routes