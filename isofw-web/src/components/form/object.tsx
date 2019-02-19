import { IFieldProps, SharedField, useObject } from "@xpfw/form"
import * as React from "react"

const ObjectField: React.FunctionComponent<IFieldProps> = (props) => {
  const objectHelper = useObject(props.schema, props.mapTo, props.prefix)
  return (
    <div className="inline inlineObject flex1">
      {objectHelper.fields.map((subField) => {
        return <SharedField key={subField.mapTo} {...subField} />
    })}
    </div>
  )
}

export default ObjectField
