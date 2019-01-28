import { Text } from "react-native";
import * as React from "react"
import NativePageContained from "isofwrn/src/components/pageContainer";

const HomePage: React.FunctionComponent<any> = (props) => {
  return (
    <NativePageContained {...props} title="PolyScript" hideBack>
      <Text>home page</Text>
    </NativePageContained>
  )
}

export default HomePage