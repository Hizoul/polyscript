import * as React from "react"
import { View } from "react-native";
import { Header, Icon, Text } from "react-native-elements";
export interface IPageContainer {
  requireLoggedIn?: boolean
  name: string
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
        <Icon name="chevron-left" color="white" size={36} onPress={() => {
          props.navigation.goBack()
        }} />
      ) : null}
      <Icon name="menu" color="white" size={36} onPress={() => {
        props.navigation.openDrawer()
      }}/>
    </View>
  )
}
const NativePageContained: React.FunctionComponent<IPageContainer> = (props) => {
  return (
    <View>
      <Header
        leftComponent={<MenuAndBack {...props} />}
        centerComponent={{text: props.title, style: {fontSize: 36, color: "white"}}}
      />
      {props.children}
    </View>
  )
}

export default NativePageContained