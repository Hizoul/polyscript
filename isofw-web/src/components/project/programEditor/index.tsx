import * as React from "react"
import { SharedFormEdit, IFormEditProps, DbStore } from "@xpfw/ui-shared";
import { ProjectForm, ProjectShot, ProjectProgram } from "isofw-shared/src/xpfwDefs/project";
import { FormStore, SharedField } from "@xpfw/form-shared";
import LoadingPage from "../../loading";
import ProgramArray from "./array";
import { get } from "lodash"
import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "isofw-shared/src/util/xpfwvalidate";
import WebButton from "isofw-web/src/components/button";
import WrappedCameraChooser from "./cameraChooser";

const programTheme = "program"
ComponentRegistry.registerComponent(FieldType.Array, ProgramArray, programTheme)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, WrappedCameraChooser, programTheme)


const ProgramEditor: React.FunctionComponent<IFormEditProps> = (props) => {
  return (
    <div className="flex1 column">
      <div className="flex center">
        <div className="titleBox">
          {get(props, "original.result.name")}
        </div>
      </div>
      <SharedField field={ProjectProgram} prefix={props.prefix} theme={programTheme} />
      <WebButton text="save" onClick={props.submitEdit} loading={props.loading} />
    </div>
  )
}

export default SharedFormEdit<{}>(ProgramEditor)