import i18n from "isofw-shared/src/util/i18n"
import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import * as React from "react"
import { Button, ButtonProps } from "react-native-elements"

export interface ICustomNativeButton {
  href?: any
  hrefParams?: any
  titleParams?: any
}

const NativeButton: React.FunctionComponent<ButtonProps & ICustomNativeButton> = (props) => {
  const buttonProps = {...props, title: i18n.t(String(props.title), props.titleParams)}
  if (props.href != null) {
    buttonProps.onPress = () => {
      navigatorRefHolder.ref.navigate(props.href, props.hrefParams)
    }
  }
  return (
    <Button
      {...buttonProps}
    />
  )
}

export default NativeButton
