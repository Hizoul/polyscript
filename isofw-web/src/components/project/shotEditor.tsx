import { BlockTitle } from "framework7-react"
import useDirector, { DirectorProps } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import {  toJS } from "isofw-shared/src/util/xpfwdata"
import { DisabledCameras, ProjectForm, ProjectName, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { prependPrefix } from "../../../../isofw-shared/src/util/xpfwform"
import BenchmarkComponent from "../benchmark"
import WebButton from "../button"
import I18n from "../i18n"
import WebCameraDisabler from "./cameraDisabler"
import "./style.sass"

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
          text={"director.previous"}
          large={true}
          iconFa="step-backward"
          onClick={directorProps.decrease}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <WebButton
          text={"director.next"}
          large={true}
          iconFa="step-forward"
          fill={true}
          onClick={directorProps.increase}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
      </div>
      <BlockTitle className="centerText"><I18n text="director.cameras" /></BlockTitle>
      <WebCameraDisabler schema={DisabledCameras} prefix={prependPrefix(ProjectForm.title, props.prefix)} autoSave={true} />
      {val.network.benchmarkEnabled ? <BenchmarkComponent projectId={props.id} /> : undefined}
    </div>
  )
})

export default ShotEditor
