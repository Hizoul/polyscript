import { Card, CardContent, CardHeader, List, Popup, ListItem, Icon } from "framework7-react"
import { useRelationship } from "isofw-shared/src/util/xpfwdata"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofw-web/src/components/displayName";
import WebRelationshipItem from "isofw-web/src/components/form/relationshipItem"
import WebRelationshipSearch from "isofw-web/src/components/form/relationshipSearch"
import I18n from "isofw-web/src/components/i18n";
import { get, isNil } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const WebRelationshipSingle: React.FunctionComponent<IFieldProps> = observer((props) => {
  const relationHelper = useRelationship(props.schema, props.mapTo, props.prefix)
  return (
    <div>
    <ListItem
      onClick={relationHelper.showDisplay}
    >
      <div slot="title">
        <I18n text="instrument" />:&nbsp;
          <NameDisplayer
            collection={get(props, "schema.relationship.collection")}
            id={relationHelper.value}
            getNameFrom={get(props, "schema.relationship.namePath")}
            placeholder="not yet selected"
          />
      </div>
      <div slot="inner">
        <Icon fa={"guitar"} />
      </div>
    </ListItem>
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
