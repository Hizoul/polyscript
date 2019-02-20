
import { IFieldProps, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import * as React from "react"
import { Switch } from "react-native"
import { observer } from "mobx-react-lite";

const NativeBooleanField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props)
  return (
    <Switch
      value={fieldHelper.value}
      onValueChange={fieldHelper.setValue}
    />
  )
})

export default NativeBooleanField
