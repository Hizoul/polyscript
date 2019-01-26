import { IArrayProps, IFieldProps, SharedArray, SharedField } from "@xpfw/form-shared"
import { List } from "framework7-react"
import {
  ShotCamera, ShotDuration, ShotImportance, ShotMovement,
  ShotMovementTowards, ShotName, ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType
} from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import { cloneDeep, get, map } from "lodash"
import * as React from "react"
import "../style.sass"

const fieldsToConvert = [ShotName, ShotType, ShotMovement, ShotMovementTowards,
  ShotDuration, ShotRemarksDirector, ShotRemarksOperator, ShotCamera, ShotPreset, ShotImportance]

const ProgramObject: React.FunctionComponent<IArrayProps & {
  index: number, size: number, remove: any, value: any
}> = (props) => {
  const convertedFields = []
  for (const field of fieldsToConvert) {
    const newField = cloneDeep(field)
    newField.mapTo = `${props.field.mapTo}[${props.index}].${field.mapTo}`
    convertedFields.push(newField)
  }
  let classes = "currentBox withMargin"
  let attentionItem: any
  if (props.value && props.value[ShotImportance.mapTo] === "r") {
    classes += " raised"
    attentionItem = <span className="attentionText">!</span>
  } else if (props.value && props.value[ShotImportance.mapTo] === "m") {
    classes += " raised2"
    attentionItem = <span className="attentionText">!!</span>
  }
  return (
    <div className={classes}>
      <div className="flex1" style={{marginBottom: "-2rem"}}>
        <WebButton
          className="boxTopLeft"
          onClick={props.removeItem(props.index)}
          text=""
          color="red"
          fill={true}
          round={true}
          iconFa="times"
        />
        <div className="flex1">&nbsp;</div>
        <WebButton
          className="boxTopRight"
          onClick={() => props.increaseSize(props.index + 1)}
          text=""
          color="green"
          fill={true}
          round={true}
          iconFa="plus"
        />
      </div>
      <span className="shotNumber">
        {attentionItem}
        {props.index}
        {attentionItem}
      </span>
      <List form={true} className="noMargin">
        <ul>
          <SharedField field={convertedFields[7]}  prefix={props.prefix} />
          <SharedField field={convertedFields[0]}  prefix={props.prefix} />
          <SharedField field={convertedFields[1]}  prefix={props.prefix} />
          <SharedField field={convertedFields[2]}  prefix={props.prefix} />
          <SharedField field={convertedFields[4]}  prefix={props.prefix} />
          <SharedField field={convertedFields[5]}  prefix={props.prefix} />
          <SharedField field={convertedFields[6]}  prefix={props.prefix} />
          <SharedField field={convertedFields[8]}  prefix={props.prefix} />
          <SharedField field={convertedFields[9]}  prefix={props.prefix} />
        </ul>
      </List>
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
    subFields.push(
    <ProgramObject {...props} key={i} index={i} size={arraySize} remove={props.removeItem(i)} value={props.value ? props.value[i] : null} />)
  }
  console.log(" Array item is ",  props)
  return (
    <div className="flex1">
      {subFields}
    </div>
  )
}

export default SharedArray(ProgramArray)
