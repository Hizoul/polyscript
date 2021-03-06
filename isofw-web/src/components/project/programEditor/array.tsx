import { List } from "framework7-react"
import { FormStore, getMapToFromProps, IFieldProps, SharedField, useArray, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import {
  ShotCamera, ShotDuration, ShotImportance, ShotMovement,
  ShotMovementTowards, ShotName, ShotNumber, ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType
} from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import I18n from "isofw-web/src/components/i18n"
import { cloneDeep, get, map } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { FixedSizeList } from "react-window"
import "../style.sass"

const fieldsToConvert = [ShotName, ShotType, ShotMovement, ShotMovementTowards,
  ShotDuration, ShotRemarksDirector, ShotRemarksOperator, ShotCamera, ShotPreset, ShotImportance, ShotNumber]

const ProgramObject: React.FunctionComponent<IFieldProps & {
  decreaseSize: any
  index: number
  increaseSize: any
  style?: any
  isScrolling?: boolean
}> = (props) => {
  const mapTo = getMapToFromProps(props)
  const fieldHelper = useFieldWithValidation(props.schema, props.mapTo, props.prefix)
  const convertedFields = []
  for (const field of fieldsToConvert) {
    const newField = cloneDeep(field)
    newField.label = field.title
    newField.title = `${mapTo}.${field.title}`
    convertedFields.push(newField)
  }
  const shotNum = FormStore.getValue(convertedFields[10].title, props.prefix)
  if (shotNum == null || shotNum !== props.index + 1) {
    FormStore.setValue(convertedFields[10].title, props.index + 1, props.prefix)
  }
  let classes = "flex "
  let attentionItem: any
  if (fieldHelper.value && fieldHelper.value[String(ShotImportance.title)] === "r") {
    classes += " raised"
    attentionItem = <span className="attentionText">!</span>
  } else if (fieldHelper.value && fieldHelper.value[String(ShotImportance.title)] === "m") {
    classes += " raised2"
    attentionItem = <span className="attentionText">!!</span>
  }
  return (
    <div className={classes} style={props.style}>
      <div className="list fullWidthList noMargin">
        <ul className="inlineList">
          <li className="flex column center verticalCenter centerText">
            <WebButton
              className="smallerButton"
              onClick={props.increaseSize}
              text=""
              color="green"
              fill={true}
              round={true}
              iconFa="plus"
            />
            <div className="centerText">
              {attentionItem}
              {get(props, "index", -2) + 1}
              {attentionItem}
            </div>
            <WebButton
              className="smallerButton"
              onClick={props.decreaseSize}
              text=""
              color="red"
              fill={true}
              round={true}
              iconFa="times"
            />
          </li>
          {props.isScrolling ?
            <li className="flex1 center verticalCenter centerText"><I18n text="forScrollSpeed" /></li> : (
            <>
              <SharedField schema={convertedFields[7]}  prefix={props.prefix} />
              <SharedField schema={convertedFields[0]}  prefix={props.prefix} />
              <SharedField schema={convertedFields[1]}  prefix={props.prefix} />
              <SharedField schema={convertedFields[2]}  prefix={props.prefix} />
              <SharedField schema={convertedFields[4]}  prefix={props.prefix} />
              <SharedField schema={convertedFields[5]}  prefix={props.prefix} />
              <SharedField schema={convertedFields[6]}  prefix={props.prefix} />
              <SharedField schema={convertedFields[9]}  prefix={props.prefix} />
              <SharedField schema={convertedFields[8]}  prefix={props.prefix} />
            </>
          )}
        </ul>
      </div>
    </div>
  )
}

const ProgramObjectListItem = (props: any) => {
  if (props.index >= props.data.fields.length) {
    return (<div style={{height: "67px", width: "100%"}}/>)
  }
  return (
    <ProgramObject
      style={props.style}
      {...props.data.props}
      {...props.data.fields[props.index]}
      index={props.index}
      isScrolling={props.isScrolling}
    />
  )
}

const ProgramArray: React.FunctionComponent<IFieldProps> = observer((props) => {
  const arrayHelper = useArray(props.schema, props.mapTo, props.prefix)
  if (arrayHelper.length === 0) {
    setTimeout(() => arrayHelper.increaseSize(), 800)
  }
  const i = 0
  return (
    <div className="flex1">
      <FixedSizeList
        height={get(global, "window.innerHeight", 500) - 150}
        width={get(global, "window.innerWidth", 500)}
        itemSize={67}
        itemData={{fields: arrayHelper.fields, props}}
        itemCount={arrayHelper.length + 3}
        useIsScrolling={true}
      >
        {ProgramObjectListItem}
      </FixedSizeList>
    </div>
  )
})

export default ProgramArray
