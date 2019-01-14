import { Panel, View, Page, Block, List,Link, ListItem } from "framework7-react";
import * as React from "react"
import urls from "isofw-shared/src/globals/url"

class MenuPanel extends React.Component<any, any> {
  public render() {
    console.log("THI SIS", this)
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
              />
              <ListItem
                link="/login"
                title="Login"
                panelClose="left"
              />
              <ListItem
                link={urls.projectOverview}
                title="Projects"
                panelClose="left"
              />
            </List>
          </Page>
      </Panel>
    )
  }
}

export default MenuPanel