
import { IFieldProps, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Switch } from "react-native"

const NativeBooleanField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  return (
    <Switch
      value={fieldHelper.value}
      onValueChange={fieldHelper.setValue}
    />
  )
})

export default NativeBooleanField
