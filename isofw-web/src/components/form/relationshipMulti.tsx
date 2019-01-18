import { SharedField } from "@xpfw/form-shared"
import { ISharedRelationshipField, ISharedRelationshipFieldProps, RelationShipWrapper } from "@xpfw/ui-shared"
import { getFieldsFromForm, IField } from "@xpfw/validate"
import { get, isNil } from "lodash"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"
import { BlockTitle, Block, Card, Popup, List, CardHeader, CardContent } from "framework7-react";
import WebButton from "../button";

class WebRelationshipMulti extends React.Component<ISharedRelationshipFieldProps, any> {
  public render() {
    let content
    const gotVal = Array.isArray(this.props.value) && this.props.value.length > 0
    const relationItems = []
    let i = 0
    for (const child of get(this.props, "relatedObject", [])) {
      relationItems.push(<WebRelationshipItem field={this.props.field} item={child} key={i} addId={this.props.addId} removeId={this.props.removeId} isAdd={false} />)
      i++
    }
    content = (
      <Card>
        <CardHeader className="flex1 row" style={{marginTop: "1.4rem"}}>
          <div className="flex1">{get(this.props, "field.mapTo", "RelationshipField")}</div>
          <WebButton
            style={{width: "auto", display: "inline-block", marginRight: "-1.5rem", marginTop: "-1.4rem"}}
            fill
            round
            raised
            onClick={this.props.setDisplayMode.bind(this, 1)}
            text=""
            iconFa="plus"
          />
        </CardHeader>
        <CardContent>
          <List>
            {relationItems}
          </List>
        </CardContent>
      </Card>
    )
    return (
      <div>
        {content}
        <Popup opened={this.props.displayMode === 1} onPopupClosed={() => this.props.setDisplayMode(0)}>
          <WebRelationshipSearch {...this.props} prefix={get(this.props, "field.mapTo")} />
        </Popup>
      </div>
    )
  }
}

const WrappedWebRelationshipMulti: React.ComponentType<ISharedRelationshipField> =
RelationShipWrapper<{}>(WebRelationshipMulti)

export default WrappedWebRelationshipMulti
export {
  ISharedRelationshipField, ISharedRelationshipFieldProps
}
