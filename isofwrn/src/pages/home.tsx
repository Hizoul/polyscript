import { MenuList } from "isofwrn/src/components/menu"
import NativePageContained from "isofwrn/src/components/pageContainer"
import * as React from "react"
import { Text } from "react-native"

const HomePage: React.FunctionComponent<any> = (props) => {
  console.debug("RENDERING HOME")
  return (
    <NativePageContained {...props} title="PolyScript" hideBack={true}>
      <Text>
        Welcome to PolyScript.
        What do you wish to do?
      </Text>
      <MenuList {...props} />
    </NativePageContained>
  )
}

export default HomePage
