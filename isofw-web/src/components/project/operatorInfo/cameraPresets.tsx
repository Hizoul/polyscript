import { DbStore, IFormEditProps, IFormShowProps, SharedFormEdit } from "@xpfw/ui-shared"
import { BlockTitle, Card, CardFooter, CardHeader, Link } from "framework7-react"
import sharedPresetUpdater, { PresetUpdaterProps } from "isofw-shared/src/components/preset/updater"
import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectForm, ProjectName, ProjectProgram, ProjectShot, ShotCamera,
  ShotDuration, ShotMovement, ShotMovementTowards, ShotName,
  ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import * as React from "react"

const PresetCard: React.FunctionComponent<PresetUpdaterProps> = (props) => {
  return (
    <Card>
      <CardHeader>
        <span>Preset #{get(props.item, PresetNumberField.mapTo)}</span>
      </CardHeader>
      <CardFooter>
        <Link text="Update" />
        <Link
          text={props.isReady ? "un-ready" : "ready"}
          onClick={props.isReady ? props.setNotReady : props.setReady}
        />
      </CardFooter>
    </Card>
  )
}
const WrappedPresetCard = sharedPresetUpdater(PresetCard)
const CameraPresets: React.FunctionComponent<IFormShowProps> = (props) => {
  return (
    <div>
      <BlockTitle>
        <NameDisplayer collection={val.service.camera} id={get(props.item, "camera")} getNameFrom={ProjectName.mapTo} placeholder="" />
      </BlockTitle>
      <div className="presetCards">
        {get(props.item, "presets", []).map((preset: any) => <WrappedPresetCard key={preset} id={preset} />)}
      </div>
    </div>
  )
}

export default CameraPresets
export {
  PresetCard
}
