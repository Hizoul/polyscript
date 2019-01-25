import { FormStore, IFieldProps } from "@xpfw/form-shared"
import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import NameDisplayer from "isofw-web/src/components/displayName"
import * as React from "react"

const presetNumberDisplay: React.FunctionComponent<IFieldProps> = (props) => {
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
