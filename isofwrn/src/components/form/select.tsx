
import { IFieldProps, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import { get, map } from "lodash"
import * as React from "react"
import { Picker } from "react-native"
import { observer } from "mobx-react-lite";

const NativeSelectField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props)
  const selOpts = get(props, "schema.selectOptions", [])
  const options = map(selOpts, (option: any) => {
    return (
      <Picker.Item key={option.value} value={option.value} label={option.label} />
    )
  })
  return (
    <Picker
      selectedValue={fieldHelper.value}
      onValueChange={fieldHelper.setValue}
    >
      {options}
    </Picker>
  )
})

export default NativeSelectField
