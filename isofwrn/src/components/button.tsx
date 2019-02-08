import * as React from "react"
import { Button, ButtonProps } from "react-native-elements"

const NativeButton: React.FunctionComponent<ButtonProps> = (props) => {
  return (
    <Button
      {...props}
    />
  )
}

export default NativeButton
