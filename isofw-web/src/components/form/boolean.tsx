import { IFieldProps, useFieldWithValidation } from "@xpfw/form"
import { get } from "lodash"
import { observer } from "mobx-react-lite";
import * as React from "react"

const BooleanField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const boolHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  return (
    <label className="checkbox flex inline center marginTop" style={{transform: "scale(1.2)"}}>
      <input
        type="checkbox"
        style={{marginRight: "0.3rem"}}
        checked={boolHelper.value}
        onChange={boolHelper.setValue}
      />
      {props.schema.title}
    </label>
  )
})

export default BooleanField
