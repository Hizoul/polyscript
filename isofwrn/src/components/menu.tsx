import { menuLoggedIn, menuLoggedOut } from "isofw-shared/src/globals/menu"
import urls from "isofw-shared/src/globals/url"
import * as React from "react"
import { FlatList, View } from "react-native"
import { Text } from "react-native-elements"
import ListItemLink from "./listItemLink"
import { observer } from "mobx-react-lite";
import { useAuth } from "isofw-shared/src/util/xpfwdata";

const MenuList: React.FunctionComponent<{}> = observer((props) => {
  const authProps = useAuth()
  const entries = authProps.loggedIn ? menuLoggedIn : menuLoggedOut
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
})

const MenuPanel: React.FunctionComponent<{}> = (props) => {
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
      <MenuList {...props} />
    </View>
  )
}

export default MenuPanel
export {
  MenuList
}
