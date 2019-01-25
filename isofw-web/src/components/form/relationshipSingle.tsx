import { ISharedRelationshipField, ISharedRelationshipFieldProps, RelationShipWrapper } from "@xpfw/ui-shared"
import { Card, CardContent, CardHeader, List, Popup } from "framework7-react"
import { get, isNil } from "lodash"
import * as React from "react"
import WebButton from "../button"
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"

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
            fill={true}
            round={true}
            raised={true}
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
