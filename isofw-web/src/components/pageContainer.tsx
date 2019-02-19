import { Block, Link, Navbar, NavLeft, NavTitle,
  Page, Subnavbar } from "framework7-react"
import { useAuth } from "isofw-shared/src/util/xpfwdata"
import { observer } from "mobx-react-lite"
import * as React from "react"
import Loading from "./loading"

export interface IPageContainer {
  requireLoggedIn?: boolean
  name: string
  title: string
  subtitle?: string
  backLink?: any
  subContent?: any
}

const WebPageContainer: React.FunctionComponent<IPageContainer> = observer((props) => {
  const authProps = useAuth()
  return (
    <Page name={props.name}>
      <Navbar
      >
        <NavLeft>
          {props.backLink ? <Link back={true} iconFa="chevron-left" /> : null}
          <Link panelOpen="left" iconFa="bars" style={{marginLeft: "0pt"}} />
        </NavLeft>
        <NavTitle subtitle={props.subtitle} title={props.title} />
        {props.subContent ? (
          <Subnavbar inner={false}>
            {props.subContent}
          </Subnavbar>
        ) : undefined}
      </Navbar>
      {props.requireLoggedIn && !authProps.loggedIn ? (
        <Block>
          {authProps.loading ? <Loading /> : null}
          Je moet ingeloggt zijn om dit te zien.
        </Block>
      ) : props.children}
    </Page>
  )
})

export default WebPageContainer
