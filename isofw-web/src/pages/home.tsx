import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer";

const Home: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer {...props} name="home" title="Polycast">Home</WebPageContainer>
  )
}

export default Home
