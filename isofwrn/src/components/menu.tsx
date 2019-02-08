import { menuLoggedIn, menuLoggedOut } from "isofw-shared/src/globals/menu"
import urls from "isofw-shared/src/globals/url"
import { IFormAuthProps, SharedFormAuth } from "isofw-shared/src/util/xpfwuishared"
import * as React from "react"
import { FlatList, View } from "react-native"
import { Text } from "react-native-elements"
import ListItemLink from "./listItemLink"

const MenuLinks: React.FunctionComponent<IFormAuthProps> = (props) => {
  const entries = props.loggedIn ? menuLoggedIn : menuLoggedOut
  return (
    <View>
      <FlatList
        data={entries}
        keyExtractor={(item) => item.link}
        renderItem={({item}) => {
          return <ListItemLink
            {...props}
            link={item.link}
            title={item.title}
            key={item.link}
            leftIcon={item.icon}
          />
        }}
      />
    </View>
  )
}
const WrappedMenuDisplayer: any = SharedFormAuth<{}>(MenuLinks)

const MenuPanel: React.FunctionComponent<IFormAuthProps> = (props) => {
  const entries = props.loggedIn ? menuLoggedIn : menuLoggedOut
  return (
    <View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginTop: 15
        }}
      >
        <Text h2={true}>PolyScript</Text>
      </View>
      <WrappedMenuDisplayer {...props} />
    </View>
  )
}

export default MenuPanel
export {
  WrappedMenuDisplayer
}
