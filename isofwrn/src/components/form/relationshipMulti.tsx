import { useRelationship } from "isofw-shared/src/util/xpfwdata"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import NativeFieldContainer from "./field"
import NativeRelationshipItem from "./relationshipItem"
import NativeRelationshipSearch from "./relationshipSearch"

const NativeRelationshipMulti: React.FunctionComponent<IFieldProps> = observer((props) => {
  const relationHelper = useRelationship(props.schema, props.mapTo, props.prefix)
  let content
  const gotVal = Array.isArray(relationHelper.value) && relationHelper.value.length > 0
  if (!gotVal || relationHelper.displayMode === 1) {
    content = (
        <NativeRelationshipSearch
          {...relationHelper}
          {...props}
        />
    )
  } else {
    const name = "loading"
    const obj = relationHelper.relatedObject
    const relationItems = []
    for (const child of relationHelper.relatedObject) {
      relationItems.push(
        <NativeRelationshipItem
          key={get(props, "field.mapTo")}
          schema={props.schema}
          item={child}
          addId={relationHelper.addId}
          removeId={relationHelper.removeId}
          isAdd={false}
        />)
    }
    content = (
      <View>
        <Button
          title="Search"
          onPress={relationHelper.showDisplay}
          icon={{name: "search"}}
        />
        {relationItems}
      </View>
    )
  }
  return (
    <NativeFieldContainer>
      {content}
    </NativeFieldContainer>
  )
})
export default NativeRelationshipMulti
