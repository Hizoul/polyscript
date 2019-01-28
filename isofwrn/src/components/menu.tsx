import { IFormAuthProps, SharedFormAuth } from "isofw-shared/src/util/xpfwuishared"
import urls from "isofw-shared/src/globals/url"
import * as React from "react"
import { View } from "react-native";
import ListItemLink from "./listItemLink"
import { menuLoggedIn, menuLoggedOut } from "isofw-shared/src/globals/menu"
import { Text } from "react-native-elements";

const MenuPanel: React.FunctionComponent<IFormAuthProps> = (props) => {
  const entries = props.loggedIn ? menuLoggedIn : menuLoggedOut
  return (
    <View>
      <View style={{justifyContent: "center", alignItems: "center"}}>
        <Text h2>PolyScript</Text>
      </View>
      {entries.map((item) =>
        <ListItemLink
          {...props}
          link={item.link}
          title={item.title}
          key={item.link}
          leftIcon={item.icon}
        />
      )}
    </View>
  )
}

const Menu: any = SharedFormAuth<{}>(MenuPanel)
export default Menu