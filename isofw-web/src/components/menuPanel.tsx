import { Block, Icon, Link, List, ListItem, Page, Panel, View } from "framework7-react"
import { menuLoggedIn, menuLoggedOut } from "isofw-shared/src/globals/menu"
import { useAuth } from "isofw-shared/src/util/xpfwdata"
import { observer } from "mobx-react-lite"
import * as React from "react"

const MenuEntries: React.FunctionComponent<any> = observer((props) => {
  const authprops = useAuth()
  const entries = authprops.loggedIn ? menuLoggedIn : menuLoggedOut
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
})

const MenuPanel: React.FunctionComponent<any> = (props) => {
  return (
    <Panel left={true} reveal={true}>
        <Page>
          <Block>
            PolyScript
          </Block>
          <MenuEntries />
        </Page>
    </Panel>
  )
}

export default MenuPanel
export {
  MenuEntries
}
