import { Block, Link, Page } from "framework7-react"
import urls from "isofw-shared/src/globals/url"
import { useAuth } from "isofw-shared/src/util/xpfwdata"
import { observer } from "mobx-react-lite"
import * as React from "react"
import I18n from "./i18n"
import Loading from "./loading"

export interface IPageContainer {
  requireLoggedIn?: boolean
  name: string
  isPreset: boolean
  id?: string
}

const PrintPageContainer: React.FunctionComponent<IPageContainer> = observer((props) => {
  const authProps = useAuth()
  return (
    <Page noNavbar={true} name={props.name} themeDark={false} colorTheme="white" bgColor="white" textColor="black">
      <Link className="hideInPrint" back={true} iconFa="chevron-left" color="black" iconSize={100} />
      <Link
        className="hideInPrint marginLeft"
        href={`${props.isPreset ? urls.printScript : urls.printPreset}/${props.id}`}
        iconFa={props.isPreset ? "list-ul" : "images"}
        color="black"
        iconSize={100}
      />
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
