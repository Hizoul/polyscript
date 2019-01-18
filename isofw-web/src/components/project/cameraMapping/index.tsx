import { IFieldProps, SharedField, SharedArray, IArrayProps } from "@xpfw/form-shared"
import { IField } from "@xpfw/validate"
import { cloneDeep, get, map } from "lodash"
import * as React from "react"
import WebButton from "isofw-web/src/components/button";
import { 
  ShotName, ShotType, ShotMovement, ShotMovementTowards,
  ShotDuration, ShotRemarksDirector, ShotRemarksOperator
} from "isofw-shared/src/xpfwDefs/project";
import "../style.sass"
import { List } from "framework7-react";
import SharedCameraMapping from "isofw-shared/src/components/project/cameraMapping";

const fieldsToConvert = [ShotName, ShotType, ShotMovement, ShotMovementTowards, ShotDuration, ShotRemarksDirector, ShotRemarksOperator]
const ProgramObject: React.FunctionComponent<IArrayProps & {index: number, size: number, remove: any}> = (props) => {
  const convertedFields = []
  for (const field of fieldsToConvert) {
    const newField = cloneDeep(field)
    newField.mapTo = `${props.field.mapTo}[${props.index}].${field.mapTo}`
    convertedFields.push(newField)
  }
  return (
    <div className="currentBox withMargin">
      <div className="flex1" style={{marginBottom: "-2rem"}}>
        <div className="flex1">&nbsp;</div>
        <WebButton
          className="boxTopRight"
          onClick={props.removeItem(props.index)}
          text=""
          color="red"
          fill
          round
          iconFa="times"
        />
      </div>
      <span className="shotNumber">{props.index}</span>
      <List form className="noMargin">
        <ul>
          <SharedField field={convertedFields[0]}  prefix={props.prefix} />
          <SharedField field={convertedFields[2]}  prefix={props.prefix} />
          <SharedField field={convertedFields[5]}  prefix={props.prefix} />
          <SharedField field={convertedFields[6]}  prefix={props.prefix} />
        </ul>
      </List>
    </div>
  )
}

const ProgramArray: React.FunctionComponent<IArrayProps> = (props) => {
  console.log("PROPS ARE", props)
  return (
    <div className="flex1">
      <WebButton
        className="is-fullwidth is-info"
        onClick={props.increaseSize}
        text="operator to camera mapping"
        iconFa="camera"
      />
    </div>
  )
}
const b: any = SharedArray(ProgramArray)
export default SharedCameraMapping(b) 

