import val from "isofw-shared/src/globals/val"
import { FormStore, IFieldProps } from "isofw-shared/src/util/xpfwformshared"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import NameDisplayer from "isofwrn/src/components/displayName"
import * as React from "react"
import { Text, View } from "react-native"
import { ListItem } from "react-native-elements"

const presetNumberDisplay: React.FunctionComponent<IFieldProps> = (props) => {
  if (props.value) {
    return (
      <ListItem
        title={<View>
          <Text>Preset: &nbsp;</Text>
          <NameDisplayer collection={val.service.preset} id={props.value} getNameFrom={PresetNumberField.mapTo} placeholder="Assigning..." />
        </View>}
      />
    )
  }
  return <ListItem title="choose a camera"/>
}

export default presetNumberDisplay
