import { IArrayProps, IFieldProps, SharedArray, SharedField } from "isofw-shared/src/util/xpfwformshared"
import {
  ShotCamera, ShotDuration, ShotImportance, ShotMovement,
  ShotMovementTowards, ShotName, ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType
} from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import { cloneDeep, get, map } from "lodash"
import * as React from "react"
import { FlatList, ScrollView, Text, View } from "react-native"
import { Card } from "react-native-elements"

const fieldsToConvert = [ShotName, ShotType, ShotMovement, ShotMovementTowards,
  ShotDuration, ShotRemarksDirector, ShotRemarksOperator, ShotCamera, ShotPreset, ShotImportance]

const ProgramObject: React.FunctionComponent<IArrayProps & {
  index: number, size: number, remove: any, value: any
}> = (props) => {
  const convertedFields = []
  for (const field of fieldsToConvert) {
    const newField = cloneDeep(field)
    newField.mapTo = `${props.field.mapTo}[${props.index}].${field.mapTo}`
    convertedFields.push(newField)
  }
  let attentionItem: any
  if (props.value && props.value[ShotImportance.mapTo] === "r") {
    attentionItem = <Text>!</Text>
  } else if (props.value && props.value[ShotImportance.mapTo] === "m") {
    attentionItem = <Text>!!</Text>
  }
  return (
    <View style={{flex: 1}}>
        <View>
          <NativeButton
            onPress={props.removeItem(props.index)}
            title=""
            icon={{name: "times", type: "font-awesome", color: "red"}}
          />
          <NativeButton
            onPress={() => props.increaseSize(props.index + 1)}
            title=""
            icon={{name: "plus", type: "font-awesome", color: "green"}}
          />
        </View>
        <View style={{flexDirection: "row"}}>
          {attentionItem}
          <Text>{props.index}</Text>
          {attentionItem}
        </View>
      <ScrollView>
        <SharedField field={convertedFields[7]}  prefix={props.prefix} />
        <SharedField field={convertedFields[0]}  prefix={props.prefix} />
        <SharedField field={convertedFields[1]}  prefix={props.prefix} />
        <SharedField field={convertedFields[2]}  prefix={props.prefix} />
        <SharedField field={convertedFields[4]}  prefix={props.prefix} />
        <SharedField field={convertedFields[5]}  prefix={props.prefix} />
        <SharedField field={convertedFields[6]}  prefix={props.prefix} />
        <SharedField field={convertedFields[8]}  prefix={props.prefix} />
        <SharedField field={convertedFields[9]}  prefix={props.prefix} />
      </ScrollView>
    </View>
  )
}

const ProgramArray: React.FunctionComponent<IArrayProps> = (props) => {
  let arraySize = 1
  if (Array.isArray(props.value) && props.value.length > 0) {
    arraySize = props.value.length
  }
  const subFields = []
  for (let i = 0; i < arraySize; i++) {
    subFields.push(i)
  }
  return (
    <FlatList
      data={subFields}
      keyExtractor={(item) => String(item)}
      horizontal={true}
      renderItem={({item}) =>
      <ProgramObject {...props} key={item} index={item} size={arraySize} remove={props.removeItem(item)} value={props.value ? props.value[item] : null} />}
    />
  )
}

export default SharedArray(ProgramArray)
