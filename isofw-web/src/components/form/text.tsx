import { getMapToFromProps, IFieldProps, memo, useFieldWithValidation } from "@xpfw/form"
import { setDate } from "@xpfw/form-web"
import { Icon, ListInput } from "framework7-react"
import { get } from "lodash"
import { observer } from "mobx-react-lite";
import * as momentA from "moment"
import * as React from "react"

const moment: any = momentA
const getOriginalFormatFromType = (dateType: number) => {
  let momentParseFrom = ""
  if (dateType === 3) {
    momentParseFrom = get(moment, "HTML5_FMT.DATE")
  } else if (dateType === 4) {
    momentParseFrom = get(moment, "HTML5_FMT.TIME")
  } else  {
    momentParseFrom = get(moment, "HTML5_FMT.DATETIME_LOCAL")
  }
  return momentParseFrom
}

const F7TextField: React.FunctionComponent<IFieldProps> = (props) => {
  const format = get(props, "schema.format")
  const isDate = format === "date" || format === "date-time" || format === "time"
  const fieldHelper = useFieldWithValidation(props.schema, getMapToFromProps(props), props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  const fieldType = get(props, "schema.type")
  let value = fieldHelper.value
  let type = "text"
  let min
  let max
  let step
  let onChange = fieldHelper.setValue
  if (fieldType === "number") {
    type = "number"
    min = get(props, "schema.minimum")
    max = get(props, "schema.maximum")
    step = get(props, "schema.step")
  }
  if (format === "slider") {
    type = "range"
  } else if (format === "password") {
    type = "password"
  } else if (isDate) {
    onChange = memo(setDate(fieldHelper.setValue, props.schema, "nativeEvent.target.value"),
      ["setDate", JSON.stringify(props.schema), props.mapTo, props.prefix])
    if (format === "date") {
      type = "date"
    } else if (format === "time") {
      type = "time"
    } else  {
      type = "datetime-local"
    }
    value = moment(value).format(getOriginalFormatFromType(format))
  }
  return (
    <ListInput
      type={type}
      id={get(props, "id")}
      className={get(props, "className")}
      value={value}
      label={get(props, "schema.title")}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
      onInputClear={() => {fieldHelper.setValue({nativeEvent: {target: {value: ""}}})}}
      clearButton={true}
    />
  )
}

export default observer(F7TextField)
export {
  setDate
}
