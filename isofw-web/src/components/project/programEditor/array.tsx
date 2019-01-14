import { IFieldProps, SharedField, SharedArray, IArrayProps } from "@xpfw/form-shared"
import { IField } from "@xpfw/validate"
import { cloneDeep, get, map } from "lodash"
import * as React from "react"
import { FaEraser, FaPlusCircle, FaTrash } from "react-icons/fa"
import WebButton from "isofw-web/src/components/button";
import { 
  ShotName, ShotType, ShotMovement, ShotMovementTowards,
  ShotDuration, ShotRemarksDirector, ShotRemarksOperator
} from "isofw-shared/src/xpfwDefs/project";
import "../style.sass"
const fieldsToConvert = [ShotName, ShotType, ShotMovement, ShotMovementTowards, ShotDuration, ShotRemarksDirector, ShotRemarksOperator]
const ProgramObject: React.FunctionComponent<IArrayProps & {index: number, size: number, remove: any}> = (props) => {
  const convertedFields = []
  for (const field of fieldsToConvert) {
    const newField = cloneDeep(field)
    newField.mapTo = `${props.field.mapTo}[${props.index}].${field.mapTo}`
    convertedFields.push(newField)
  }
  return (
    <div className="currentBox">
      <span className="shotNumber">{props.index}</span>
      <SharedField field={convertedFields[0]}  prefix={props.prefix} />
      <SharedField field={convertedFields[2]}  prefix={props.prefix} />
      <SharedField field={convertedFields[5]}  prefix={props.prefix} />
      <SharedField field={convertedFields[6]}  prefix={props.prefix} />
      <WebButton
        className="is-warning  iconMargin"
        onClick={props.removeItem(props.index)}
        text="delete"
        icon={<FaEraser className="is-size-6"/>}
        rightIcon={true}
      />
    </div>
  )
}

const ProgramArray: React.FunctionComponent<IArrayProps> = (props) => {
  let arraySize = 1
  if (Array.isArray(props.value) && props.value.length > 0) {
    arraySize = props.value.length
  }
  const subFields = []
  for (let i = 0; i < arraySize; i++) {
    subFields.push(<ProgramObject {...props} key={i} index={i} size={arraySize} remove={props.removeItem(i)} />)
  }
  return (
    <div className="flex1">
      {subFields}
      <WebButton
        className="is-fullwidth is-info"
        onClick={props.increaseSize}
        text="Add"
        icon={<FaPlusCircle />}
        rightIcon={true}
      />
    </div>
  )
}

export default SharedArray(ProgramArray) 


// {map(props.subFields, (field: any, index: any) => {
//   return (
//   <div className="flex flex1 center">
//     <SharedField field={field} prefix={props.prefix} />
    // <WebButton
    //   className="is-warning  iconMargin"
    //   onClick={props.removeItem(index)}
    //   text="delete"
    //   icon={<FaEraser className="is-size-6"/>}
    //   rightIcon={true}
    // />
//   </div>
// )})}
// <div className="flex center">
  // <WebButton
  //   className="is-fullwidth is-info"
  //   onClick={props.increaseSize}
  //   text="Add"
  //   icon={<FaPlusCircle />}
  //   rightIcon={true}
  // />
// </div>