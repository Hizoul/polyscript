import { BlockTitle, Icon, List, ListItem } from "framework7-react"
import urls from "isofw-shared/src/globals/url"
import { WrappedMenuEntries } from "isofw-web/src/components/menuPanel"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import * as React from "react"

const Home: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer {...props} name="home" title="PolyScript">
      <BlockTitle>
        welcome to PolyScript.<br />
        what do you wish to do?
      </BlockTitle>
      <WrappedMenuEntries />
    </WebPageContainer>
  )
}

export default Home
