import getForm from "isofw-shared/src/util/getForm"
import NativeEdit from "isofwrn/src/components/form/edit"
import NativePageContained from "isofwrn/src/components/pageContainer"
import * as React from "react"
import { Text } from "react-native"

const NativeEditPage: React.FunctionComponent<any> = (props) => {
  const collection = props.navigation.getParam("collection", "none")
  const id = props.navigation.getParam("id", "none")
  const form = getForm(collection)
  if (form == null) {
    return (
      <NativePageContained {...props} title="edit" backLink={true} requireLoggedIn={true}>
        <Text>Collection not found</Text>
      </NativePageContained>
    )
  }
  return (
    <NativePageContained {...props} title="edit">
      <NativeEdit schema={form} id={id} prefix="edit" />
    </NativePageContained>
  )
}

export default NativeEditPage
