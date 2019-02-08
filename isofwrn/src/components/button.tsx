import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import * as React from "react"
import { Button, ButtonProps } from "react-native-elements"

export interface ICustomNativeButton {
  href?: any
}

const NativeButton: React.FunctionComponent<ButtonProps & ICustomNativeButton> = (props) => {
  const buttonProps = {...props}
  if (props.href != null) {
    buttonProps.onPress = () => {
      navigatorRefHolder.ref.navigate(props.href)
    }
  }
  return (
    <Button
      {...buttonProps}
    />
  )
}

export default NativeButton
