import { Panel, View, Page, Block, List,Link, ListItem, Icon } from "framework7-react";
import * as React from "react"
import urls from "isofw-shared/src/globals/url"
import { SharedFormAuth, IFormAuthProps } from "@xpfw/ui-shared"

const MenuPanel: React.FunctionComponent<IFormAuthProps> = (props) => {
  return (
    <Panel left reveal>
        <Page>
          <Block>
            Poly direct
          </Block>
          <List>
            <ListItem
              link="/"
              title="Home"
              panelClose="left"
            >
              <Icon slot="media" fa="home" />
            </ListItem>
            {props.loggedIn ? null : (
              <ListItem
                link="/login"
                title="Login"
                panelClose="left"
              >
                <Icon slot="media" fa="sign-in-alt" />
              </ListItem>
            )}
            <ListItem
              link={urls.projectOverview}
              title="Projects"
              panelClose="left"
            >
              <Icon slot="media" fa="folder" />
            </ListItem>
            {!props.loggedIn ? null : (
              <ListItem
                link="/login"
                title="Logout"
                panelClose="left"
              >
                <Icon slot="media" fa="sign-out-alt" />
              </ListItem>
            )}
          </List>
        </Page>
    </Panel>
  )
}

export default SharedFormAuth<{}>(MenuPanel)