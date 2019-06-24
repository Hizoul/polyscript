import { Block, Link, Navbar, NavLeft, NavRight,
  NavTitle, Page, Subnavbar } from "framework7-react"
import { useAuth } from "isofw-shared/src/util/xpfwdata"
import { observer } from "mobx-react-lite"
import * as React from "react"
import i18n from "../../../isofw-shared/src/util/i18n"
import I18n from "./i18n"
import Loading from "./loading"

export interface IPageContainer {
  requireLoggedIn?: boolean
  name: string
}

const PrintPageContainer: React.FunctionComponent<IPageContainer> = observer((props) => {
  const authProps = useAuth()
  return (
    <Page noNavbar={true} name={props.name} themeDark={false} colorTheme="white" bgColor="white" textColor="black">
      <Link className="hideInPrint" back={true} iconFa="chevron-left" color="black" iconSize={100} />
      {props.requireLoggedIn && !authProps.loggedIn ? (
        <Block>
          {authProps.loading ? <Loading /> : null}
          <I18n text="login.required" />
        </Block>
      ) : props.children}
    </Page>
  )
})

export default PrintPageContainer
