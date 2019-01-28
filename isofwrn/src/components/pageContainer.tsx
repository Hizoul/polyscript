import * as React from "react"
import { View } from "react-native";

const NativePageContained: React.FunctionComponent<any> = (props) => {
  return (
    <View>
      {props.children}
    </View>
  )
}

export default NativePageContained