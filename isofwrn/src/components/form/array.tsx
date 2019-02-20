import { IFieldProps, SharedField, useArray } from "isofw-shared/src/util/xpfwform"
import * as React from "react"
import { View } from "react-native"
import { Button } from "react-native-elements"
import { observer } from "mobx-react-lite";

const NativeArrayField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const arrayHelper = useArray(props.schema, props.mapTo, props.prefix)
  return (
    <View>
      {arrayHelper.fields.map((field) => {
        return (
        <View key={field.mapTo} style={{flex: 1, flexDirection: "row", alignItems: "center"}}>
          <SharedField {...field} />
          <Button
            onPress={field.decreaseSize}
            title="Delete"
          />
        </View>
      )})}
      <View style={{marginTop: 5}}>
        <Button
          onPress={arrayHelper.increaseSize}
          title="Add"
        />
      </View>
    </View>
  )
})

export default NativeArrayField
