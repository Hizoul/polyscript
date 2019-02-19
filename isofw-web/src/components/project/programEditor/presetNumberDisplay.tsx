import { IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { ListItem } from "framework7-react"
import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import NameDisplayer from "isofw-web/src/components/displayName"
import * as React from "react"

const presetNumberDisplay: React.FunctionComponent<IFieldProps> = (props) => {
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  if (fieldHelper.value && fieldHelper.value) {
    return (
      <ListItem>
        <div slot="title">
          Preset: &nbsp;
          <NameDisplayer collection={val.service.preset} id={fieldHelper.value} getNameFrom={String(PresetNumberField.title)} placeholder="Assigning..." />
        </div>
      </ListItem>
    )
  }
  return <ListItem text="choose a camera"/>
}

export default presetNumberDisplay
