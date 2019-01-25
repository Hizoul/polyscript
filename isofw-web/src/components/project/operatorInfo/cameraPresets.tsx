import { DbStore, IFormEditProps, IFormShowProps, SharedFormEdit } from "@xpfw/ui-shared"
import { BlockTitle, Card, CardFooter, CardHeader, Link } from "framework7-react"
import val from "isofw-shared/src/globals/val"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectForm, ProjectName, ProjectProgram, ProjectShot, ShotCamera,
  ShotDuration, ShotMovement, ShotMovementTowards, ShotName,
  ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import * as React from "react"

const CameraPresets: React.FunctionComponent<IFormShowProps> = (props) => {
  return (
    <div>
      <BlockTitle>
        <NameDisplayer collection={val.service.camera} id={get(props.item, "camera")} getNameFrom={ProjectName.mapTo} placeholder="" />
      </BlockTitle>
      <div className="presetCards">
        {get(props.item, "presets", []).map((preset: any) => (
          <Card>
            <CardHeader>
              <span>Preset #
              <NameDisplayer collection={val.service.preset} id={preset} getNameFrom={PresetNumberField.mapTo} placeholder="" /></span>
            </CardHeader>
            <CardFooter>
              <Link text="Update" />
              <Link text="Toggle readiness" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default CameraPresets
