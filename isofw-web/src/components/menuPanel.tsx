import { IFormAuthProps, SharedFormAuth } from "@xpfw/ui-shared"
import { Block, Icon, Link, List, ListItem, Page, Panel, View } from "framework7-react"
import { menuLoggedIn, menuLoggedOut } from "isofw-shared/src/globals/menu"
import urls from "isofw-shared/src/globals/url"
import * as React from "react"

const MenuEntries: React.FunctionComponent<IFormAuthProps> = (props) => {
  const entries = props.loggedIn ? menuLoggedIn : menuLoggedOut
  return (
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
  )
}
const WrappedMenuEntries = SharedFormAuth<{}>(MenuEntries)
const MenuPanel: React.FunctionComponent<any> = (props) => {
  return (
    <Panel left={true} reveal={true}>
        <Page>
          <Block>
            PolyScript
          </Block>
          <WrappedMenuEntries />
        </Page>
    </Panel>
  )
}

export default MenuPanel
export {
  WrappedMenuEntries
}
