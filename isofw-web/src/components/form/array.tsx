import { IFieldProps, SharedField, useArray } from "isofw-shared/src/util/xpfwform"
import WebButton from "isofw-web/src/components/button"
import { map } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const ArrayField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const arrayHelper = useArray(props.schema, props.mapTo, props.prefix)
  return (
    <div>
      {map(arrayHelper.fields, (field, index: any) => {
        return (
        <div className="flex flex1 center">
          <SharedField schema={field.schema} mapTo={field.mapTo} prefix={props.prefix} />
          <WebButton
            onClick={field.decreaseSize}
            text="delete"
          />
        </div>
      )})}
      <div className="flex center">
        <WebButton
          onClick={arrayHelper.increaseSize}
          text="Add"
        />
      </div>
    </div >
  )
})

export default ArrayField
