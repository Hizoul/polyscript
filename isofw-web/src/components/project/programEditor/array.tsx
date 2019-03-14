import { List } from "framework7-react"
import { getMapToFromProps, IFieldProps, SharedField, useArray, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import {
  ShotCamera, ShotDuration, ShotImportance, ShotMovement,
  ShotMovementTowards, ShotName, ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType
} from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import { cloneDeep, get, map } from "lodash"
import * as React from "react"
import "../style.sass"
import { observer } from "mobx-react-lite";

const fieldsToConvert = [ShotName, ShotType, ShotMovement, ShotMovementTowards,
  ShotDuration, ShotRemarksDirector, ShotRemarksOperator, ShotCamera, ShotPreset, ShotImportance]

const ProgramObject: React.FunctionComponent<IFieldProps & {
  decreaseSize: any
  index: number
  increaseSize: any
}> = (props) => {
  const mapTo = getMapToFromProps(props)
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  const convertedFields = []
  for (const field of fieldsToConvert) {
    const newField = cloneDeep(field)
    newField.title = `${mapTo}.${field.title}`
    convertedFields.push(newField)
  }
  let classes = "currentBox withMargin"
  let attentionItem: any
  if (fieldHelper.value && fieldHelper.value[String(ShotImportance.title)] === "r") {
    classes += " raised"
    attentionItem = <span className="attentionText">!</span>
  } else if (fieldHelper.value && fieldHelper.value[String(ShotImportance.title)] === "m") {
    classes += " raised2"
    attentionItem = <span className="attentionText">!!</span>
  }
  return (
    <div className={classes}>
      <div className="flex1" style={{marginBottom: "-2rem"}}>
        <WebButton
          className="boxTopLeft"
          onClick={props.decreaseSize}
          text=""
          color="red"
          fill={true}
          round={true}
          iconFa="times"
        />
        <div className="flex1">&nbsp;</div>
        <WebButton
          className="boxTopRight"
          onClick={props.increaseSize}
          text=""
          color="green"
          fill={true}
          round={true}
          iconFa="plus"
        />
      </div>
      <span className="shotNumber">
        {attentionItem}
        {get(props, "index")}
        {attentionItem}
      </span>
      <List form={true} className="noMargin">
        <ul>
          <SharedField schema={convertedFields[7]}  prefix={props.prefix} />
          <SharedField schema={convertedFields[0]}  prefix={props.prefix} />
          <SharedField schema={convertedFields[1]}  prefix={props.prefix} />
          <SharedField schema={convertedFields[2]}  prefix={props.prefix} />
          <SharedField schema={convertedFields[4]}  prefix={props.prefix} />
          <SharedField schema={convertedFields[5]}  prefix={props.prefix} />
          <SharedField schema={convertedFields[6]}  prefix={props.prefix} />
          <SharedField schema={convertedFields[8]}  prefix={props.prefix} />
          <SharedField schema={convertedFields[9]}  prefix={props.prefix} />
        </ul>
      </List>
    </div>
  )
}

const ProgramArray: React.FunctionComponent<IFieldProps> = observer((props) => {
  const arrayHelper = useArray(props.schema, props.mapTo, props.prefix)
  let i = 0
  return (
    <div className="flex1">
      {arrayHelper.fields.map((subField) =>
        <ProgramObject
          {...props}
          key={subField.mapTo}
          {...subField}
          index={++i}
        />
      )}
    </div>
  )
})

export default ProgramArray
