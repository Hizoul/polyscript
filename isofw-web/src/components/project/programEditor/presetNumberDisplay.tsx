import { IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { ListItem } from "framework7-react"
import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import NameDisplayer from "isofw-web/src/components/displayName"
import { observer } from "mobx-react-lite";
import * as React from "react"
import I18n from "isofw-web/src/components/i18n";

const presetNumberDisplay: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  if (fieldHelper.value && fieldHelper.value) {
    return (
      <li className="flex verticalCenter">
        Preset: &nbsp;
        <NameDisplayer collection={val.service.preset} id={fieldHelper.value} getNameFrom={String(PresetNumberField.title)} placeholder="Assigning..." />
      </li>
    )
  }
  return (
    <li className="flex verticalCenter">
      <I18n text="noPreset" />
    </li>
  )
})

export default presetNumberDisplay
