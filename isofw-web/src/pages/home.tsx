import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import { List, ListItem, Icon, BlockTitle } from "framework7-react";
import urls from "isofw-shared/src/globals/url";

const Home: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer {...props} name="home" title="PolyScript">
      <BlockTitle>
        welcome to PolyScript.<br />
        what do you wish to do?
      </BlockTitle>
      <List>
        <ListItem
          link={urls.projectOverview}
          title="Projects"
          key="Projects"
          panelClose="left"
        >
          <Icon slot="media" fa="folder" />
        </ListItem>
        <ListItem
          link={urls.cameraOverview}
          title="Cameras"
          key="Cameras"
          panelClose="left"
        >
          <Icon slot="media" fa="camera-retro" />
        </ListItem>
      </List>
    </WebPageContainer>
  )
}

export default Home
