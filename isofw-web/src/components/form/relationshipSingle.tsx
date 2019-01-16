import { ISharedRelationshipField, ISharedRelationshipFieldProps, RelationShipWrapper } from "@xpfw/ui-shared"
import { get, isNil } from "lodash"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"
import { Card, CardHeader, CardContent, List, Popup } from "framework7-react";
import WebButton from "../button";

class WebRelationshipSingle extends React.Component<ISharedRelationshipFieldProps, any> {
  public render() {
    let content: any
    return (
      <div>
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
            {content}
          </List>
        </CardContent>
      </Card>
      <Popup opened={this.props.displayMode === 1} onPopupClosed={() => this.props.setDisplayMode(0)}>
        <WebRelationshipSearch
          {...this.props}
          prefix={get(this.props, "field.mapTo")}
        />
      </Popup>
      </div>
    )
  }
}

const WrappedWebRelationshipSingle: React.ComponentType<ISharedRelationshipField> =
RelationShipWrapper<{}>(WebRelationshipSingle)
export default WrappedWebRelationshipSingle
export {
  ISharedRelationshipField, ISharedRelationshipFieldProps
}
