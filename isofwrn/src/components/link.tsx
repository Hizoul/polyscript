import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import * as React from "react"
import { TouchableHighlight } from "react-native"
import { Button, ButtonProps } from "react-native-elements"

export interface ICustomNativeButton {
  href?: any
  hrefParams?: any
}

const NativeLink: React.FunctionComponent<ICustomNativeButton> = (props) => {
  return (
    <TouchableHighlight
      onPress={() => {
        navigatorRefHolder.ref.navigate(props.href, props.hrefParams)
      }}
    >
      {props.children}
    </TouchableHighlight>
  )
}

export default NativeLink
