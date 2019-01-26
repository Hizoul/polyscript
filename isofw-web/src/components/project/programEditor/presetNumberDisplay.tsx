import { FormStore, IFieldProps } from "@xpfw/form-shared"
import { ListItem } from "framework7-react";
import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import NameDisplayer from "isofw-web/src/components/displayName"
import * as React from "react"

const presetNumberDisplay: React.FunctionComponent<IFieldProps> = (props) => {
  if (props.value && props.value) {
    return (
      <ListItem>
        <div slot="title">
          Preset: &nbsp;
          <NameDisplayer collection={val.service.preset} id={props.value} getNameFrom={PresetNumberField.mapTo} placeholder="Assigning..." />
        </div>
      </ListItem>
    )
  }
  return <ListItem text="choose a camera"/>
}

export default presetNumberDisplay
