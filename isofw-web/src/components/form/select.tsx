import { ListInput } from "framework7-react"
import i18n from "isofw-shared/src/util/i18n"
import { IFieldProps, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import { get, isFunction } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const SelectField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  let selOpts = get(props, "schema.selectOptions", [])
  if (isFunction(selOpts)) {
    selOpts = selOpts(fieldHelper.value, props.schema, props)
  }
  const options = selOpts.map((option: any) => {
    return (
      <option key={option.value} value={option.value}>
        {option.label}
      </option>
    )
  })
  return (
    <ListInput
      type="select"
      label={i18n.t(get(props, "schema.title"))}
      className={get(props, "className")}
      value={fieldHelper.value ? fieldHelper.value : "n"}
      onChange={fieldHelper.setValue}
    >
      {options}
    </ListInput>
  )
})

export default SelectField
