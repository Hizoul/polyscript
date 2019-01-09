import * as React from "react"
import { SharedFormEdit, IFormEditProps, DbStore } from "@xpfw/ui-shared";
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project";
import { FormStore } from "@xpfw/form-shared";
import sharedDirectorComponent, { DirectorComponentProps } from "isofw-shared/src/components/project/directorSheet";
import LoadingPage from "../loading";
import WebButton from "../button";
import { get } from "lodash"
import "./style.sass"
import { FaStepForward, FaStepBackward, FaSync } from "react-icons/fa";


const ProgramEditor: React.FunctionComponent<IFormEditProps> = (props) => {
  return (
    <div className="flex1 column">
      <div className="flex center">
        <div className="titleBox">
          {get(props, "original.result.name")}
        </div>
      </div>
      <div className="flex center">
        <div className="currentBox">
          <span className="shotNumber">{get(props, "original.result.shot")}</span>
          <br />
          <span>CA ?</span>
        </div>
      </div>
      {props.loading ? <LoadingPage /> : null}
    </div>
  )
}

export default SharedFormEdit<{}>(ProgramEditor)