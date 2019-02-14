import { ValidationRegistry } from "isofw-shared/src/util/xpfwvalidate"
import NativeCreate from "isofwrn/src/components/form/create"
import NativePageContained from "isofwrn/src/components/pageContainer"
import * as React from "react"
import { Text } from "react-native"

const NativeCreatePage: React.FunctionComponent<any> = (props) => {
  const collection = props.navigation.getParam("collection", "none")
  const id = props.navigation.getParam("id", "none")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <NativePageContained {...props} title="create" backLink={true} requireLoggedIn={true}>
        <Text>Collection not found</Text>
      </NativePageContained>
    )
  }
  return (
    <NativePageContained {...props} title="create">
      <NativeCreate form={form} id={id} resetState={true} prefix="create" />
    </NativePageContained>
  )
}

export default NativeCreatePage
