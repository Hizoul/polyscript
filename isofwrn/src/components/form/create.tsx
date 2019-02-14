import { FormStore, SharedField } from "isofw-shared/src/util/xpfwformshared"
import { IFormCreateProps, ISharedFormEdit, ListStore, SharedFormCreate } from "isofw-shared/src/util/xpfwuishared"
import { getFieldsFromForm,  IField } from "isofw-shared/src/util/xpfwvalidate"
import { get } from "lodash"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { Card } from "react-native-elements"
import NativeButton from "../button"

class MiniEdit extends React.Component<IFormCreateProps, any> {
  public render() {
    const fields = this.props.fields.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} prefix={this.props.prefix} user={this.props.user} />
    })
    const gotErr = get(this.props, "error.errors.length", 0)
    const result = get(this.props, "state.result")
    let msg: any
    if (gotErr) {
      msg = (
        <Card
          title="Error"
        >
          <Text>{`please recheck your inputs or connection ${JSON.stringify(get(this.props, "error"))}`}</Text>
        </Card>
      )
    }
    if (result) {
      msg = (
        <Card
          title="success"
        >
          <Text>{`created entry with ID ${get(result, get(this.props.form, "options.idPath", "_id"))}`}</Text>
        </Card>
      )
    }
    return (
      <View>
        <ScrollView>
          {fields}
        </ScrollView>
        <NativeButton
          onPress={this.props.submitCreate}
          icon={{name: "plus", type: "font-awesome"}}
          title="create"
          loading={this.props.loading}
        />
        {msg}
      </View>
    )
  }
}

const NativeCreate: React.ComponentType<ISharedFormEdit> = SharedFormCreate<{}>(MiniEdit)

export default NativeCreate
