import { useRelationship } from "isofw-shared/src/util/xpfwdata"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import NativeFieldContainer from "./field"
import NativeRelationshipItem from "./relationshipItem"
import NativeRelationshipSearch from "./relationshipSearch"
import { get } from "lodash"
import NativeButton from "../button"
import { Card, ListItem, Overlay } from "react-native-elements"
import { StyleSheet, ScrollView } from "react-native"
import i18n from "isofw-shared/src/util/i18n"
import I18n from "isofwrn/src/components/i18n"
import baseStyles from "isofwrn/src/styles/base"
import margins from "isofwrn/src/styles/margins"

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 25,
    flex: 1
  }
})

const NativeRelationshipMulti: React.FunctionComponent<IFieldProps> = observer((props) => {
  const relationHelper = useRelationship(props.schema, props.mapTo, props.prefix)
  let content
  const gotVal = Array.isArray(relationHelper.value) && relationHelper.value.length > 0
  if (gotVal) {
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
    content = relationItems
  }
  return (
    <Card containerStyle={margins.noPadding}>
      <ListItem
        title={i18n.t(get(props, "schema.label", get(props, "schema.title", )))}
        rightIcon={{name: "plus", type: "font-awesome", color: "green"}}
        onPress={relationHelper.showDisplay}
      />
      {content}
      <Overlay
        isVisible={relationHelper.displayMode === true}
        onBackdropPress={relationHelper.hideDisplay}
        overlayStyle={margins.noPadding}
      >
        <ScrollView>
          <NativeRelationshipSearch
            {...relationHelper}
            {...props}
          />
        </ScrollView>
      </Overlay>
    </Card>
  )
})
export default NativeRelationshipMulti
