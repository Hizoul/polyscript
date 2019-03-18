import { Block, Link, Navbar, NavLeft, NavTitle,
  Page, Subnavbar } from "framework7-react"
import { useAuth } from "isofw-shared/src/util/xpfwdata"
import { observer } from "mobx-react-lite"
import * as React from "react"
import i18n from "../../../isofw-shared/src/util/i18n"
import I18n from "./i18n"
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
        <NavTitle
          subtitle={props.subtitle != null ? i18n.t(props.subtitle) : undefined}
          title={i18n.t(props.title)}
        />
        {props.subContent ? (
          <Subnavbar inner={false}>
            {props.subContent}
          </Subnavbar>
        ) : undefined}
      </Navbar>
      {props.requireLoggedIn && !authProps.loggedIn ? (
        <Block>
          {authProps.loading ? <Loading /> : null}
          <I18n text="login.required" />
        </Block>
      ) : props.children}
    </Page>
  )
})

export default WebPageContainer
