import { dataOptions, IEditHookProps, useEditWithProps } from "isofw-shared/src/util/xpfwdata"
import { getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { Card } from "react-native-elements"
import NativeButton from "../button"

const NativeEdit: React.FunctionComponent<IEditHookProps> = (props) => {
  const editProps = useEditWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(
      <SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = editProps.error != null
  const result = editProps.state
  let msg: any
  if (gotErr) {
    msg = (
      <Card
        title="Error"
      >
        <Text>{`please recheck your inputs or connection ${JSON.stringify(editProps.error)}`}</Text>
      </Card>
    )
  }
  if (result) {
    msg = (
      <Card
        title="success"
      >
        <Text>{`saved changes to ${get(result, dataOptions.idPath)}`}</Text>
      </Card>
    )
  }
  return (
    <View>
      <ScrollView>
        {fields}
      </ScrollView>
      <NativeButton
        onPress={editProps.submitEdit}
        icon={{name: "save", type: "font-awesome"}}
        title="save"
        loading={editProps.loading}
      />
      {msg}
    </View>
  )
}

export default NativeEdit
