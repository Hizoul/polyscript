import { IArrayProps, IFieldProps, SharedArray, SharedField } from "@xpfw/form-shared"
import { IField } from "@xpfw/validate"
import WebButton from "isofw-web/src/components/button"
import { cloneDeep, get, map } from "lodash"
import * as React from "react"

const Rayfield: React.FunctionComponent<IArrayProps> = (props) => {
  return (
    <div>
      {map(props.subFields, (field: any, index: any) => {
        return (
        <div className="flex flex1 center">
          <SharedField field={field} prefix={props.prefix} />
          <WebButton
            onClick={props.removeItem(index)}
            text="delete"
          />
        </div>
      )})}
      <div className="flex center">
        <WebButton
          onClick={props.increaseSize}
          text="Add"
        />
      </div>
    </div >
  )
}

export default SharedArray(Rayfield)
