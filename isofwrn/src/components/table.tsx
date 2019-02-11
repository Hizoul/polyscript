import i18n from "isofw-shared/src/util/i18n"
import { get, isFunction, isString } from "lodash"
import * as React from "react"
import { FlatList, Text, View } from "react-native"

export type RowContent = string | React.FunctionComponent<{item: any, isHeader?: boolean}>

export interface INativeTable {
  data: any[]
  rows: RowContent[]
  keyExtractor: (item: any) => string
}

const textAlignmentStyle: any = {flex: 1, alignItems: "center", justifyContent: "center"}

const viewWrapStyle = {paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: "black"}

const NativeTable: React.FunctionComponent<INativeTable> = (props) => {
  return (
    <View style={{flexDirection: "column"}}>
      <View style={{flexDirection: "row"}}>
        {props.rows.map((Item: any) => {
          if (isString(Item)) {
            return <View key={Item} style={[viewWrapStyle, textAlignmentStyle]}>
              <Text>{Item}</Text>
            </View>
          }
          if (isFunction(Item)) {
            return <View style={[viewWrapStyle, {flex: 1}]} />
          }
          return <View key={Item} />
        })}
      </View>
      <FlatList
        data={props.data}
        keyExtractor={props.keyExtractor}
        contentContainerStyle={{flexDirection: "column"}}
        renderItem={({item, index}) => {
          return <View style={{flexDirection: "row"}}>
            {props.rows.map((WantedContent: any) => {
              if (isString(WantedContent)) {
                return <View key={WantedContent} style={[viewWrapStyle, textAlignmentStyle]}><Text>{get(item, WantedContent)}</Text></View>
              }
              if (isFunction(WantedContent)) {
                return <View style={[viewWrapStyle, {flex: 1}]}><WantedContent {...props} key={WantedContent} item={item} /></View>
              }
              return <View key={WantedContent} />
            })}
          </View>
        }}
      />
    </View>
  )
}

export default NativeTable
