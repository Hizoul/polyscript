import { ShotNumber } from "isofw-shared/src/xpfwDefs/project"
import { get, isFunction, isString } from "lodash"
import * as React from "react"
import { FlatList, Text, View } from "react-native"

export type RowContent = string | React.FunctionComponent<{item: any, isHeader?: boolean}>

export interface INativeTable {
  data: any[]
  rows: RowContent[]
  refGetter?: any
  currentEntry?: number
  keyExtractor: (item: any) => string
}

const textAlignmentStyle: any = {flex: 1, alignItems: "center", justifyContent: "center"}

const viewWrapStyle = {paddingTop: 10, paddingBottom: 10, borderBottomWidth: 1, borderColor: "rgb(142, 142, 147);"}

const NativeTable: React.FunctionComponent<INativeTable> = (props) => {
  let i = 0
  return (
    <View style={{flexDirection: "column", maxHeight: 220}}>
      <View style={{flexDirection: "row"}}>
        {props.rows.map((Item: any) => {
          if (isString(Item)) {
            return <View key={Item} style={[viewWrapStyle, textAlignmentStyle]}>
              <Text>{Item}</Text>
            </View>
          }
          if (isFunction(Item)) {
            i++
            return <View style={[viewWrapStyle, {flex: 1}]}><Item key={i} isHeader={true} /></View>
          }
          return <View key={Item} />
        })}
      </View>
      <FlatList
        data={props.data}
        keyExtractor={props.keyExtractor}
        contentContainerStyle={{flexDirection: "column"}}
        ref={props.refGetter}
        renderItem={({item, index}) => {
          return <View style={{flexDirection: "row", backgroundColor: props.currentEntry === get(item, ShotNumber.title, -1) ? "rgba(255, 0, 0, 0.1)" : "rgba(255, 255, 255, 1)"}}>
            {props.rows.map((WantedContent: any) => {
              if (isString(WantedContent)) {
                return <View key={WantedContent} style={[viewWrapStyle, textAlignmentStyle]}><Text>{get(item, WantedContent)}</Text></View>
              }
              if (isFunction(WantedContent)) {
                return <View style={[viewWrapStyle, {flex: 1}]}><WantedContent {...props} key={WantedContent} item={item} index={index} /></View>
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
