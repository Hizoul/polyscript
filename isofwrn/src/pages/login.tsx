import { Text } from "react-native";
import * as React from "react"
import NativePageContained from "isofwrn/src/components/pageContainer";

const LogInPage: React.FunctionComponent<any> = (props) => {
  return (
    <NativePageContained {...props} title="log in">
      <Text>login page</Text>
    </NativePageContained>
  )
}

export default LogInPage