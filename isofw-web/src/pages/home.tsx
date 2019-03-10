import { BlockTitle } from "framework7-react"
import BenchmarkComponent from "isofw-web/src/components/benchmark"
import { MenuEntries } from "isofw-web/src/components/menuPanel"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import * as React from "react"

const Home: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer {...props} name="home" title="PolyScript">
      <BlockTitle>
        welcome to PolyScript.<br />
        what do you wish to do?
      </BlockTitle>
      <MenuEntries />
    </WebPageContainer>
  )
}

export default Home
