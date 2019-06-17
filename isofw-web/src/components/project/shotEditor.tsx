import { BlockTitle, List } from "framework7-react"
import useDirector, { DirectorProps } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import {  toJS } from "isofw-shared/src/util/xpfwdata"
import { DisabledCameras, ProjectForm, ProjectName, ShotCamera, ShotName } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import "isofw-web/src/components/form"
import BenchmarkComponent from "../benchmark"
import WebButton from "../button"
import I18n from "../i18n"
import WebCameraDisabler from "./cameraDisabler"
import "./style.sass"

const ShotEditor = observer((props: DirectorProps) => {
  console.log("PREFIX IS", props.prefix)
  const directorProps: any = useDirector(props.id)
  return (
    <div className="flex1 column">
      <div className="flex center marginTopBottom">
        <div className="titleBox">
          {get(directorProps, "original.name")}
        </div>
      </div>
      <div className="flex center">
        <div className="currentBox shotEditorInfoBox">
          Shot<br />
          <span className="shotNumber">{get(directorProps, "original.shot", 0) + 1}</span>
          <br />
          <NameDisplayer
            collection={val.service.camera}
            id={get(directorProps, `original.program[${get(directorProps, "original.shot")}].${ShotCamera.title}`)}
            getNameFrom={String(ProjectName.title)}
            placeholder=""
          />
          <br />
          {get(directorProps, `original.program[${get(directorProps, "original.shot")}].${ShotName.title}`)}
        </div>
      </div>
      <div className="flex center marginTopBottom">
        <WebButton
          text={"director.previous"}
          className="hugeButton"
          iconFa="step-backward"
          preventTextChange
          onClick={directorProps.decrease}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <div style={{width: "1.5rem"}} />
        <WebButton
          text={"director.next"}
          className="hugeButton"
          iconFa="step-forward"
          fill={true}
          preventTextChange
          onClick={directorProps.increase}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
      </div>
      <div className="flex column center">
        <List>
          <ul>
            <SharedField schema={directorProps.numField} prefix={props.prefix} />
          </ul>
        </List>
        <WebButton
          style={{marginTop: "-2rem"}}
          text={"director.setTo"}
          iconFa="fast-forward"
          preventTextChange
          onClick={directorProps.setTo}
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
