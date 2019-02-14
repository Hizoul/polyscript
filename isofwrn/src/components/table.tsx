import i18n from "isofw-shared/src/util/i18n"
import { get, isFunction, isString } from "lodash"
import * as React from "react"
import { FlatList, Text, View } from "react-native"

export type RowContent = string | React.Component<{item: any}>

export interface INativeTable {
  data: any[]
  rows: RowContent[]
  keyExtractor: (item: any) => string
}

const textAlignmentStyle: any = {flex: 1, alignItems: "center"}

const NativeTable: React.FunctionComponent<INativeTable> = (props) => {
  return (
    <View style={{flexDirection: "column"}}>
      <View style={{flexDirection: "row"}}>
        {props.rows.map((item: any) => {
          if (isString(item)) {
            return <View style={textAlignmentStyle}>
              <Text>{item}</Text>
            </View>
          }
          return <View key={item} />
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
                return <View key={WantedContent} style={textAlignmentStyle}><Text>{get(item, WantedContent)}</Text></View>
              }
              if (isFunction(WantedContent)) {
                return <WantedContent {...props} key={WantedContent} item={item} />
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
