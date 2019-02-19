import { IEditHookProps, useEditWithProps } from "@xpfw/data"
import { ComponentRegistry, FormStore, SharedField } from "@xpfw/form"
import { FieldType } from "isofw-shared/src/util/xpfwvalidate"
import { ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import { get } from "lodash"
import * as React from "react"
import ProgramArray from "./array"
import WrappedCameraChooser from "./cameraChooser"
import PresetNumberDisplay from "./presetNumberDisplay"

const programTheme = "program"
ComponentRegistry.registerComponent(FieldType.Array, ProgramArray, programTheme)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, WrappedCameraChooser, programTheme)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, PresetNumberDisplay, ShotPreset.theme)

const ProgramEditor: React.FunctionComponent<IEditHookProps> = (props) => {
  const editHelper = useEditWithProps(props)
  return (
    <div className="flex1 column">
      <div className="flex center">
        <div className="titleBox">
          {get(props, "original.result.name")}
        </div>
      </div>
      <SharedField schema={ProjectProgram} prefix={props.prefix} theme={programTheme} />
      <WebButton text="save" onClick={editHelper.submitEdit} loading={editHelper.loading} />
    </div>
  )
}

export default ProgramEditor
