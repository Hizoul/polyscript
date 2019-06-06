import { Icon, ListItem } from "framework7-react"
import { dataOptions } from "isofw-shared/src/util/xpfwdata"
import { ExtendedJSONSchema } from "isofw-shared/src/util/xpfwform"
import { get, isNil } from "lodash"
import * as React from "react"

class WebRelationshipItem extends React.Component<{
    item: any
    schema: ExtendedJSONSchema
    removeId: any
    addId: any
    isAdd: boolean
}, any> {
  public render() {
    let name = "loading"
    let id
    const obj = this.props.item
    if (!isNil(obj)) {
      name = get(obj, get(this.props, "schema.relationship.namePath", dataOptions.idPath), "NOTFOUND")
      id = get(obj, get(this.props, "schema.relationship.idPath", dataOptions.idPath), "NOTFOUND")
    }
    const action = this.props.isAdd ? this.props.addId.bind(this, id) : this.props.removeId.bind(this, id)
    return (
      <ListItem
        title={name}
        onClick={this.props.isAdd ? action : undefined}
      >
        <div
          slot="inner"
          onClick={this.props.isAdd ? undefined : action}
        >
          <Icon
            slot="inner"
            fa={this.props.isAdd ? "plus" : "trash"}
            color={!this.props.isAdd ? "red" : "green"}
          />
        </div>
      </ListItem>
    )
  }
}
export default WebRelationshipItem
