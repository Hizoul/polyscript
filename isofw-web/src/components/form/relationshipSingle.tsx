import { Card, CardContent, CardHeader, List, Popup } from "framework7-react"
import { useRelationship } from "isofw-shared/src/util/xpfwdata"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { get, isNil } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebButton from "../button"
import NameDisplayer from "../displayName";
import WebRelationshipItem from "./relationshipItem"
import WebRelationshipSearch from "./relationshipSearch"

const WebRelationshipSingle: React.FunctionComponent<IFieldProps> = observer((props) => {
  const relationHelper = useRelationship(props.schema, props.mapTo, props.prefix)
  return (
    <div>
    <Card>
      <CardHeader className="flex1 row" style={{marginTop: "1.4rem"}}>
        <div className="flex1">{get(props, "schema.title", "RelationshipField")}</div>
        <WebButton
          style={{width: "auto", display: "inline-block", marginRight: "-1.5rem", marginTop: "-1.4rem"}}
          fill={true}
          round={true}
          raised={true}
          onClick={relationHelper.showDisplay}
          text=""
          iconFa="plus"
        />
      </CardHeader>
      <CardContent>
        <List>
          <NameDisplayer
            collection={get(props, "schema.relationship.collection")}
            id={relationHelper.value}
            getNameFrom={get(props, "schema.relationship.namePath")}
          />
        </List>
      </CardContent>
    </Card>
    <Popup opened={relationHelper.displayMode} onPopupClosed={relationHelper.hideDisplay}>
      <WebRelationshipSearch
        {...relationHelper}
        {...props}
      />
    </Popup>
    </div>
  )
})

export default WebRelationshipSingle
