import { IFieldProps, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform";
import { get } from "lodash"
import * as React from "react"
import { FlatList, View } from "react-native"
import { useList } from "../../../../isofw-shared/src/util/xpfwdata";
import NativeRelationshipItem from "./relationshipItem"

const NativeRelationshipSearch: React.FunctionComponent<any> = (props) => {
  const searchField = get(props, `searchForm.properties[${get(props, "schema.relationship.namePath")}]`)
  const nameObjs: any = []
  const addId = get(props, "addId")
  const removeId = get(props, "removeId")
  const field = get(props, "schema")
  const relList = useList(props.searchForm, undefined, props.prefix)
  return (
    <View>
      <SharedField schema={searchField} theme="search" prefix={prependPrefix(props.searchForm.title, props.prefix)} />
      <FlatList
        data={get(relList, "list.data", [])}
        keyExtractor={(item: any) => item._id}
        renderItem={({item}) =>
          <NativeRelationshipItem schema={field} item={item} addId={addId} removeId={removeId} isAdd={true} />}
      />
    </View>
  )
}

export default NativeRelationshipSearch
