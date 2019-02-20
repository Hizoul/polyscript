import getForm from "isofw-shared/src/util/getForm"
import NativeCreate from "isofwrn/src/components/form/create"
import NativePageContained from "isofwrn/src/components/pageContainer"
import * as React from "react"
import { Text } from "react-native"

const NativeCreatePage: React.FunctionComponent<any> = (props) => {
  const collection = props.navigation.getParam("collection", "none")
  const form = getForm(collection)
  if (form == null) {
    return (
      <NativePageContained {...props} title="create" backLink={true} requireLoggedIn={true}>
        <Text>Collection not found</Text>
      </NativePageContained>
    )
  }
  return (
    <NativePageContained {...props} title="create">
      <NativeCreate schema={form} reset={true} prefix="create" />
    </NativePageContained>
  )
}

export default NativeCreatePage
