import i18n from "isofw-shared/src/util/i18n";
import { IFieldProps, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Input } from "react-native-elements"

const NativeTextField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  const fieldType = get(props, "schema.type")
  let secureTextEntry = false
  let keyboardType: any = "default"
  if (fieldType === "number") {
    keyboardType = "numeric"
  } else if (get(props, "schema.format") === "password") {
    secureTextEntry = true
  }
  return (
    <Input
      {...props}
      label={i18n.t(get(props, "schema.title"))}
      secureTextEntry={secureTextEntry}
      value={fieldHelper.value}
      keyboardType={keyboardType}
      onChangeText={fieldHelper.setValue}
    />
  )
})

export default NativeTextField
