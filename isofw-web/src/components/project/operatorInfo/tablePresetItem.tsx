import { DbStore, IFormEditProps, IFormShowProps, SharedFormEdit } from "@xpfw/ui-shared"
import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectForm, ProjectName, ProjectProgram, ProjectShot, ShotCamera,
  ShotDuration, ShotImportance, ShotMovement, ShotMovementTowards,
  ShotName, ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import * as React from "react"

const TablePresetItem: React.FunctionComponent<IFormShowProps & {index: number}> = (props) => {
  let importance = ""
  const importanceValue = get(props.item, ShotImportance.mapTo)
  if (importanceValue === "r") {
    importance = "!"
  } else if (importanceValue === "m") {
    importance = "!!"
  }
  return (
    <tr id={`presetPositioner${props.index}`}>
      <td>{props.index}</td>
      <td>
        <NameDisplayer collection={val.service.camera} id={get(props.item, ShotCamera.mapTo)} getNameFrom={ProjectName.mapTo} placeholder="" />
      </td>
      <td>
        <NameDisplayer collection={val.service.preset} id={get(props.item, ShotPreset.mapTo)} getNameFrom={PresetNumberField.mapTo} placeholder="" />
      </td>
      <td>{importance}</td>
      <td>{get(props.item, ShotName.mapTo)}</td>
      <td>{get(props.item, ShotType.mapTo)}</td>
      <td>{get(props.item, ShotMovement.mapTo)}</td>
      <td>{get(props.item, ShotMovementTowards.mapTo)}</td>
      <td>{get(props.item, ShotDuration.mapTo)}</td>
      <td>placeholder</td>
      <td>
        {get(props.item, ShotRemarksDirector.mapTo)}<br />
        {get(props.item, ShotRemarksOperator.mapTo)}
      </td>
    </tr>
  )
}

export default TablePresetItem
