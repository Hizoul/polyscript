import val from "isofw-shared/src/globals/val"
import { useAuth } from "isofw-shared/src/util/xpfwdata";
import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import { get } from "lodash"
import { observer } from "mobx-react-lite";
import * as React from "react"
import { Platform, View } from "react-native"
import { colors, Header, Icon, ThemeProvider } from "react-native-elements"

const theme = {
  colors: {
    ...Platform.select({
      default: colors.platform.android,
      ios: colors.platform.ios
    }),
    grey3: "#ccc"
  }
}

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
const NativePageContained: React.FunctionComponent<IPageContainer> = observer((props) => {
  const authProps = useAuth()
  navigatorRefHolder.ref = get(props, "navigation")
  if (val.navigateTo.url != null && val.navigateTo.navigated === false && authProps.loggedIn) {
    val.navigateTo.navigated = true
    setTimeout(() => navigatorRefHolder.ref.navigate(val.navigateTo.url, val.navigateTo.params)
    , 100)
  }
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
})

export default NativePageContained
