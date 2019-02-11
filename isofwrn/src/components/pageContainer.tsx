import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import { get } from "lodash"
import * as React from "react"
import { View } from "react-native"
import { Header, Icon, Text } from "react-native-elements"
export interface IPageContainer {
  requireLoggedIn?: boolean
  title: string
  subtitle?: string
  backLink?: any
  subContent?: any
  hideBack?: boolean
}
const MenuAndBack: React.FunctionComponent<any> = (props) => {
  return (
    <View style={{flexDirection: "row"}}>
      {!props.hideBack ? (
        <Icon
          name="chevron-left"
          color="rgb(0, 122, 255)"
          size={38}
          onPress={() => {
            props.navigation.goBack()
          }}
        />
      ) : null}
      <Icon
        name="menu"
        color="rgb(0, 122, 255)"
        size={36}
        onPress={() => {
          props.navigation.openDrawer()
        }}
      />
    </View>
  )
}
const NativePageContained: React.FunctionComponent<IPageContainer> = (props) => {
  navigatorRefHolder.ref = get(props, "navigation")
  return (
    <View style={{flex: 1}}>
      <Header
        backgroundColor="rgb(247, 247, 248)"
        leftComponent={<MenuAndBack {...props} />}
        centerComponent={{text: props.title, style: {marginTop: -5, fontSize: 34, color: "black"}}}
      />
      {props.children}
    </View>
  )
}

export default NativePageContained
