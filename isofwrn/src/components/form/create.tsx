import { dataOptions, ICreateHookProps, useCreateWithProps } from "isofw-shared/src/util/xpfwdata"
import { getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { Card } from "react-native-elements"
import NativeButton from "../button"

const NativeCreate: React.FunctionComponent<ICreateHookProps> = (props) => {
  const createProps = useCreateWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(
      <SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = createProps.error != null
  const result = createProps.state
  let msg: any
  if (gotErr) {
    msg = (
      <Card
        title="Error"
      >
        <Text>{`please recheck your inputs or connection ${JSON.stringify(createProps.error)}`}</Text>
      </Card>
    )
  }
  if (result) {
    msg = (
      <Card
        title="success"
      >
        <Text>{`created entry with ID ${get(result, dataOptions.idPath)}`}</Text>
      </Card>
    )
  }
  return (
    <View>
      <ScrollView>
        {fields}
      </ScrollView>
      <NativeButton
        onPress={createProps.submitCreate}
        icon={{name: "plus", type: "font-awesome"}}
        title="create"
        loading={createProps.loading}
      />
      {msg}
    </View>
  )
}

export default NativeCreate
