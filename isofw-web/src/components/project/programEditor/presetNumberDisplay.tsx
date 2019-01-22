import { IFieldProps, FormStore } from "@xpfw/form-shared"
import * as React from "react"
import val from "isofw-shared/src/globals/val";
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import NameDisplayer from "isofw-web/src/components/displayName"

const presetNumberDisplay: React.FunctionComponent<IFieldProps> = (props) => {
  console.log("GETTING PRESET", props.value, props.field)
  if (props.value && props.value) {
    return (
      <span>
        Preset: &nbsp;
        <NameDisplayer collection={val.service.preset} id={props.value} getNameFrom={PresetNumberField.mapTo} placeholder="Assigning..." />
      </span>
    )
  }
  return <span>choose a camera</span>
}

export default presetNumberDisplay
