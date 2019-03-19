import { ExtendedJSONSchema } from "isofw-shared/src/util/xpfwform";
import {  get, isNil } from "lodash"
import * as React from "react"
import { ListItem, Button, Card } from "react-native-elements"

class NativeRelationshipItem extends React.Component<{
  item: any
  schema: ExtendedJSONSchema
  removeId: any
  addId: any
  isAdd: boolean
  successBg?: any
  errBg?: any
}, any> {
  public render() {
    let name = "loading"
    let id
    const obj = this.props.item
    if (!isNil(obj)) {
      name = get(obj, get(this.props, "schema.relationship.namePath", "id"), "NOTFOUND")
      id = get(obj, get(this.props, "schema.relationship.idPath", "id"), "NOTFOUND")
    }
    const actionBtn = (
      <ListItem
        title={name}
        buttonStyle={this.props.successBg}
        onPress={this.props.isAdd ? this.props.addId.bind(this, id) : this.props.removeId.bind(this, id)}
        rightIcon={{
          name: this.props.isAdd ? "add" : "remove",
          color: this.props.isAdd ? "green" : "red"
        }}
      />
    )
    return actionBtn
  }
}

export default NativeRelationshipItem
