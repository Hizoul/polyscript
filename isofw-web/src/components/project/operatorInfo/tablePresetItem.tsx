import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import {
  ProjectName, ShotCamera,
  ShotDuration, ShotImportance, ShotMovement, ShotMovementTowards,
  ShotName, ShotNumber, ShotPreset, ShotRemarksDirector,
  ShotRemarksOperator, ShotType
} from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import * as React from "react"

const TablePresetItem: React.FunctionComponent<{item: any, currentShot: number}> = (props) => {
  let importance = ""
  const importanceValue = get(props.item, String(ShotImportance.title))
  if (importanceValue === "r") {
    importance = "!"
  } else if (importanceValue === "m") {
    importance = "!!"
  }
  const shotNumber = get(props.item, String(ShotNumber.title), 999)
  return (
    <tr id={`presetPositioner${shotNumber}`} className={props.currentShot === shotNumber ? "isActive" : ""}>
      <td>{shotNumber}</td>
      <td>
        <NameDisplayer collection={val.service.camera} id={get(props.item, String(ShotCamera.title))} getNameFrom={String(ProjectName.title)} placeholder="" />
      </td>
      <td>
        <NameDisplayer collection={val.service.preset} id={get(props.item, String(ShotPreset.title))} getNameFrom={String(PresetNumberField.title)} placeholder="" increaseByOne={true} />
      </td>
      <td>{importance}</td>
      <td>{get(props.item, String(ShotName.title))}</td>
      <td>{get(props.item, String(ShotType.title))}</td>
      <td>{get(props.item, String(ShotMovement.title))}</td>
      <td>{get(props.item, String(ShotMovementTowards.title))}</td>
      <td>{get(props.item, String(ShotDuration.title))}</td>
      <td>
        {get(props.item, String(ShotRemarksDirector.title))}<br />
        {get(props.item, String(ShotRemarksOperator.title))}
      </td>
    </tr>
  )
}

export default TablePresetItem
