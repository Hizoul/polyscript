import { IFormAuthProps, SharedFormAuth } from "@xpfw/ui-shared"
import { Block, Icon, Link, List, ListItem, Page, Panel, View } from "framework7-react"
import { menuLoggedIn, menuLoggedOut } from "isofw-shared/src/globals/menu"
import urls from "isofw-shared/src/globals/url"
import * as React from "react"

const MenuPanel: React.FunctionComponent<IFormAuthProps> = (props) => {
  const entries = props.loggedIn ? menuLoggedIn : menuLoggedOut
  return (
    <Panel left={true} reveal={true}>
        <Page>
          <Block>
            PolyScript
          </Block>
          <List>
            {entries.map((item) =>
              <ListItem
                link={item.link}
                title={item.title}
                key={item.link}
                panelClose="left"
              >
                <Icon slot="media" fa={item.icon.name} />
              </ListItem>
            )}
          </List>
        </Page>
    </Panel>
  )
}

export default SharedFormAuth<{}>(MenuPanel)
