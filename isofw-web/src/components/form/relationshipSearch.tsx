import { BlockTitle, Card, List } from "framework7-react"
import { useList } from "isofw-shared/src/util/xpfwdata"
import { SharedField } from "isofw-shared/src/util/xpfwform"
import { get, isNil } from "lodash"
import * as React from "react"
import WebRelationshipItem from "./relationshipItem"

const WebRelationshipSearch: React.FunctionComponent<any> = (props) => {
  const searchField = get(props, `searchForm.properties[${get(props, "schema.relationship.namePath")}]`)
  const nameObjs: any = []
  const addId = get(props, "addId")
  const removeId = get(props, "removeId")
  const field = get(props, "schema")
  const relList = useList(props.searchForm, undefined, props.prefix)
  for (const child of get(relList, "list.data", [])) {
    nameObjs.push(<WebRelationshipItem schema={field} item={child} addId={addId} removeId={removeId} isAdd={true} />)
  }
  return (
    <div>
      <BlockTitle>Search for {props.searchForm.collection}</BlockTitle>
      <List>
        <ul>
          <SharedField schema={searchField} theme="search" prefix={props.prefix} />
        </ul>
      </List>
      <Card>
        <List>
          <ul>
            {nameObjs}
          </ul>
        </List>
      </Card>
    </div>
  )
}

export default WebRelationshipSearch
