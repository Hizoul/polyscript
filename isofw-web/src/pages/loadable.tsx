import LoadingPage from "isofw-web/src/components/loading"
import * as React from "react"
import * as Loadable from "react-loadable"

const LoadableCreatePage = Loadable({
  loading: LoadingPage,
  loader: () => import("./collections/create")
})

const LoadableEditPage = Loadable({
  loading: LoadingPage,
  loader: () => import("./collections/edit")
})

const LoadableListPage = Loadable({
  loading: LoadingPage,
  loader: () => import("./collections/list")
})

const LoadableLoginPage = Loadable({
  loading: LoadingPage,
  loader: () => import("./login")
})

const LoadableProjectOverview = Loadable({
  loading: LoadingPage,
  loader: () => import("./project/overview")
})

const LoadableProgramPage = Loadable({
  loading: LoadingPage,
  loader: () => import("./project/program")
})

const LoadableDirectorPage = Loadable({
  loading: LoadingPage,
  loader: () => import("./project/directorSheet")
})


export {
  LoadableCreatePage, LoadableEditPage, LoadableListPage, LoadableLoginPage,
  LoadableDirectorPage, LoadableProjectOverview, LoadableProgramPage
}
