import { FormStore, SharedField } from "isofw-shared/src/util/xpfwformshared"
import { IFormEditProps, ISharedFormEdit, ListStore, SharedFormEdit } from "isofw-shared/src/util/xpfwuishared"
import { getFieldsFromForm,  IField } from "isofw-shared/src/util/xpfwvalidate"
import { get } from "lodash"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { Card } from "react-native-elements"
import NativeButton from "../button"

class MiniEdit extends React.Component<IFormEditProps, any> {
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
          <Text>{`Saved changes to ${get(result, get(this.props.form, "options.idPath", "_id"))}`}</Text>
        </Card>
      )
    }
    return (
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          {fields}
        </ScrollView>
        <NativeButton
          onPress={this.props.submitEdit}
          icon={{name: "save", type: "font-awesome"}}
          title="Save"
          loading={this.props.loading}
        />
        {msg}
      </View>
    )
  }
}

const NativeEdit: React.ComponentType<ISharedFormEdit> = SharedFormEdit<{}>(MiniEdit)

export default NativeEdit
