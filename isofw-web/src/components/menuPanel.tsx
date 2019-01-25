import { IFormAuthProps, SharedFormAuth } from "@xpfw/ui-shared"
import { Block, Icon, Link, List, ListItem, Page, Panel, View } from "framework7-react"
import urls from "isofw-shared/src/globals/url"
import * as React from "react"

const MenuPanel: React.FunctionComponent<IFormAuthProps> = (props) => {
  return (
    <Panel left={true} reveal={true}>
        <Page>
          <Block>
            PolyScript
          </Block>
          <List>
            <ListItem
              link="/"
              title="Home"
              panelClose="left"
            >
              <Icon slot="media" fa="home" />
            </ListItem>
            {props.loggedIn ? [
              <ListItem
                link={urls.projectOverview}
                title="Projects"
                key="Projects"
                panelClose="left"
              >
                <Icon slot="media" fa="folder" />
              </ListItem>,
              <ListItem
                link={urls.cameraOverview}
                title="Cameras"
                key="Cameras"
                panelClose="left"
              >
                <Icon slot="media" fa="camera-retro" />
              </ListItem>,
              <ListItem
                link="/login"
                title="Logout"
                key="Logout"
                panelClose="left"
              >
                <Icon slot="media" fa="sign-out-alt" />
              </ListItem>
            ] : (
              <ListItem
                link="/login"
                title="Login"
                panelClose="left"
              >
                <Icon slot="media" fa="sign-in-alt" />
              </ListItem>
            )}
          </List>
        </Page>
    </Panel>
  )
}

export default SharedFormAuth<{}>(MenuPanel)
