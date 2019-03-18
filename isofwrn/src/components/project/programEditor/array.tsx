import {
  getMapToFromProps, IFieldProps, SharedField, useArray, useFieldWithValidation
} from "isofw-shared/src/util/xpfwform"
import {
  ShotCamera, ShotDuration, ShotImportance, ShotMovement,
  ShotMovementTowards, ShotName, ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType
} from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import { cloneDeep, get, map } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { FlatList, ScrollView, Text, View } from "react-native"

const fieldsToConvert = [ShotName, ShotType, ShotMovement, ShotMovementTowards,
  ShotDuration, ShotRemarksDirector, ShotRemarksOperator, ShotCamera, ShotPreset, ShotImportance]

const ProgramObject: React.FunctionComponent<IFieldProps & {
  decreaseSize: any
  increaseSize: any
}> = (props) => {
  const mapTo = getMapToFromProps(props)
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  const convertedFields = []
  for (const field of fieldsToConvert) {
    const newField = cloneDeep(field)
    newField.label = field.title
    newField.title = `${mapTo}.${field.title}`
    convertedFields.push(newField)
  }
  let attentionItem: any
  if (fieldHelper.value && fieldHelper.value[String(ShotImportance.title)] === "r") {
    attentionItem = <Text>!</Text>
  } else if (fieldHelper.value && fieldHelper.value[String(ShotImportance.title)] === "m") {
    attentionItem = <Text>!!</Text>
  }
  return (
    <View style={{flex: 1}}>
        <View>
          <NativeButton
            onPress={props.decreaseSize}
            title=""
            icon={{name: "times", type: "font-awesome", color: "red"}}
          />
          <NativeButton
            onPress={props.increaseSize}
            title=""
            icon={{name: "plus", type: "font-awesome", color: "green"}}
          />
        </View>
        <View style={{flexDirection: "row"}}>
          {attentionItem}
          <Text>R</Text>
          {attentionItem}
        </View>
      <ScrollView>
        <SharedField schema={convertedFields[7]}  prefix={props.prefix} />
        <SharedField schema={convertedFields[0]}  prefix={props.prefix} />
        <SharedField schema={convertedFields[1]}  prefix={props.prefix} />
        <SharedField schema={convertedFields[2]}  prefix={props.prefix} />
        <SharedField schema={convertedFields[4]}  prefix={props.prefix} />
        <SharedField schema={convertedFields[5]}  prefix={props.prefix} />
        <SharedField schema={convertedFields[6]}  prefix={props.prefix} />
        <SharedField schema={convertedFields[8]}  prefix={props.prefix} />
        <SharedField schema={convertedFields[9]}  prefix={props.prefix} />
      </ScrollView>
    </View>
  )
}

const ProgramArray: React.FunctionComponent<IFieldProps> = observer((props) => {
  const arrayHelper = useArray(props.schema, props.mapTo, props.prefix)
  return (
    <FlatList
      data={arrayHelper.fields}
      keyExtractor={(item) => String(item)}
      horizontal={true}
      renderItem={({item}) =>
      <ProgramObject
        {...props}
        key={item.mapTo}
        {...item}
      />}
    />
  )
})

export default ProgramArray
