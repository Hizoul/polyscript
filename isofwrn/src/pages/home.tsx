import { WrappedMenuDisplayer } from "isofwrn/src/components/menu"
import NativePageContained from "isofwrn/src/components/pageContainer"
import * as React from "react"
import { Text } from "react-native"

const HomePage: React.FunctionComponent<any> = (props) => {
  return (
    <NativePageContained {...props} title="PolyScript" hideBack={true}>
      <Text>
        Welcome to PolyScript.
        What do you wish to do?
      </Text>
      <WrappedMenuDisplayer {...props} />
    </NativePageContained>
  )
}

export default HomePage
