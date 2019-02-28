import useDirector, { DirectorProps } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import {  toJS } from "isofw-shared/src/util/xpfwdata"
import { DisabledCameras, ProjectForm, ProjectName, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { prependPrefix } from "../../../../isofw-shared/src/util/xpfwform";
import WebButton from "../button"
import WebCameraDisabler from "./cameraDisabler";
import "./style.sass"
import { BlockTitle } from "framework7-react";

const ShotEditor = observer((props: DirectorProps) => {
  const directorProps: any = useDirector(props.id)
  return (
    <div className="flex1 column">
      <div className="flex center">
        <div className="titleBox">
          {get(directorProps, "original.name")}
        </div>
      </div>
      <div className="flex center">
        <div className="currentBox">
          <span className="shotNumber">{get(directorProps, "original.shot")}</span>
          <br />
          <span>CA&nbsp;
            <NameDisplayer
              collection={val.service.camera}
              id={get(directorProps, `original.program[${get(directorProps, "original.shot")}].${ShotCamera.title}`)}
              getNameFrom={String(ProjectName.title)}
              placeholder=""
            />
          </span>
        </div>
      </div>
      <div className="flex center">
        <WebButton
          text={"previous shot"}
          large={true}
          iconFa="step-backward"
          onClick={directorProps.decrease}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <WebButton
          text={"next shot"}
          large={true}
          iconFa="step-forward"
          fill={true}
          onClick={directorProps.increase}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <WebButton
          large={true}
          iconFa="sync"
          text={"placeholder"}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
      </div>
      <BlockTitle className="centerText">Automatically controlled cameras</BlockTitle>
      <WebCameraDisabler schema={DisabledCameras} prefix={prependPrefix(ProjectForm.title, props.prefix)} autoSave={true} />
    </div>
  )
})

export default ShotEditor
