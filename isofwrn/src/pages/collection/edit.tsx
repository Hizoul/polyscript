import { ValidationRegistry } from "isofw-shared/src/util/xpfwvalidate"
import NativeEdit from "isofwrn/src/components/form/edit"
import NativePageContained from "isofwrn/src/components/pageContainer"
import * as React from "react"
import { Text } from "react-native"

const NativeEditPage: React.FunctionComponent<any> = (props) => {
  const collection = props.navigation.getParam("collection", "none")
  const id = props.navigation.getParam("id", "none")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <NativePageContained {...props} title="edit" backLink={true} requireLoggedIn={true}>
        <Text>Collection not found</Text>
      </NativePageContained>
    )
  }
  return (
    <NativePageContained {...props} title="edit">
      <NativeEdit form={form} id={id} resetState={true} prefix="edits" />
    </NativePageContained>
  )
}

export default NativeEditPage
