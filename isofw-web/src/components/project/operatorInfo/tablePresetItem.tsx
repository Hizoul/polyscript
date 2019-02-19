import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectForm, ProjectName, ProjectProgram, ProjectShot, ShotCamera,
  ShotDuration, ShotImportance, ShotMovement, ShotMovementTowards,
  ShotName, ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import * as React from "react"

const TablePresetItem: React.FunctionComponent<{item: any, index: number}> = (props) => {
  let importance = ""
  const importanceValue = get(props.item, String(ShotImportance.title))
  if (importanceValue === "r") {
    importance = "!"
  } else if (importanceValue === "m") {
    importance = "!!"
  }
  return (
    <tr id={`presetPositioner${props.index}`}>
      <td>{props.index}</td>
      <td>
        <NameDisplayer collection={val.service.camera} id={get(props.item, String(ShotCamera.title))} getNameFrom={String(ProjectName.title)} placeholder="" />
      </td>
      <td>
        <NameDisplayer collection={val.service.preset} id={get(props.item, String(ShotPreset.title))} getNameFrom={String(PresetNumberField.title)} placeholder="" />
      </td>
      <td>{importance}</td>
      <td>{get(props.item, String(ShotName.title))}</td>
      <td>{get(props.item, String(ShotType.title))}</td>
      <td>{get(props.item, String(ShotMovement.title))}</td>
      <td>{get(props.item, String(ShotMovementTowards.title))}</td>
      <td>{get(props.item, String(ShotDuration.title))}</td>
      <td>placeholder</td>
      <td>
        {get(props.item, String(ShotRemarksDirector.title))}<br />
        {get(props.item, String(ShotRemarksOperator.title))}
      </td>
    </tr>
  )
}

export default TablePresetItem
