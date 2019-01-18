import { SharedField } from "@xpfw/form-shared"
import { RelationShipWrapper, ISharedRelationshipFieldProps, ISharedRelationshipField } from "@xpfw/ui-shared"
import { getFieldsFromForm, IField } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import WebRelationshipSearch from "./relationshipSearch";
import { Icon, ListItem } from "framework7-react";

class WebRelationshipItem extends React.Component<{
    item: any
    field: IField
    removeId: any
    addId: any
    isAdd: boolean
}, any> {
  public render() {
    let name = "loading"
    let id
    const obj = this.props.item
    if (!isNil(obj)) {
      name = get(obj, get(this.props, "field.validate.relationshipNamePath", "id"), "NOTFOUND")
      id = get(obj, get(this.props, "field.validate.relationshipIdPath", "id"), "NOTFOUND")
    }
    let action = this.props.isAdd ? this.props.addId.bind(this, id) : this.props.removeId.bind(this, id)
    return (
      <ListItem
        title={name}
        after={this.props.isAdd ? "add" : "remove"}
        onClick={action}
      >
        <Icon
          slot="inner"
          fa={this.props.isAdd ? "plus" : "trash"}
          color={!this.props.isAdd ? "red" : "green"}
        />
      </ListItem>
    )
  }
}
export default WebRelationshipItem
