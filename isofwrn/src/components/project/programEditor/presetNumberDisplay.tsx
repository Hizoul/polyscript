import val from "isofw-shared/src/globals/val"
import { IFieldProps, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import NameDisplayer from "isofwrn/src/components/displayName"
import { observer } from "mobx-react-lite";
import * as React from "react"
import { Text, View } from "react-native"
import { ListItem } from "react-native-elements"

const presetNumberDisplay: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  if (fieldHelper.value) {
    return (
      <ListItem
        title={<View>
          <Text>Preset: &nbsp;</Text>
          <NameDisplayer collection={val.service.preset} id={fieldHelper.value} getNameFrom={String(PresetNumberField.title)} placeholder="Assigning..." />
        </View>}
      />
    )
  }
  return <ListItem title="choose a camera"/>
})

export default presetNumberDisplay
