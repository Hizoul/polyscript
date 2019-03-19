import i18n from "isofw-shared/src/util/i18n"
import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import * as React from "react"
import { Button, ButtonProps, Icon } from "react-native-elements"
import { TouchableHighlight, View } from "react-native"

export interface ICustomNativeButton {
  href?: any
  hrefParams?: any
  titleParams?: any
}

const CustomNativeButton: React.FunctionComponent<ButtonProps & ICustomNativeButton> = (props) => {
  const buttonProps = {...props, title: i18n.t(String(props.title), props.titleProps)}
  if (props.href != null) {
    buttonProps.onPress = () => {
      navigatorRefHolder.ref.navigate(props.href, props.hrefParams)
    }
  }
  return (
    <TouchableHighlight
      onPress={props.onPress}
      style={props.style}
    >
      <View>
        {props.icon ? <Icon {...props.icon} /> : undefined}
      </View>
    </TouchableHighlight>
  )
}

export default CustomNativeButton
