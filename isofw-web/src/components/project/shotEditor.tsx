import useDirector, { DirectorProps } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import { ProjectName, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import { observer } from "mobx-react-lite";
import * as React from "react"
import WebButton from "../button"
import LoadingPage from "../loading"
import "./style.sass"

const ShotEditor = (props: DirectorProps) => {
  const directorProps = useDirector(props.id, props.reset)
  return (
    <div className="flex1 column">
      <div className="flex center">
        <div className="titleBox">
          {get(props, "original.name")}
        </div>
      </div>
      <div className="flex center">
        <div className="currentBox">
          <span className="shotNumber">{get(props, "original.shot")}</span>
          <br />
          <span>CA&nbsp;
            <NameDisplayer
              collection={val.service.camera}
              id={get(props, `original.program[${get(props, "original.shot")}].${ShotCamera.title}`)}
              getNameFrom={String(ProjectName.title)}
              placeholder=""
            />
          </span>
        </div>
      </div>
      <div className="flex center">
        <WebButton
          text={"previous shot"}
          big={true}
          iconFa="step-backward"
          onClick={directorProps.decrease}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <WebButton
          text={"next shot"}
          big={true}
          iconFa="step-forward"
          fill={true}
          onClick={directorProps.increase}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <WebButton
          big={true}
          iconFa="sync"
          text={"placeholder"}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
      </div>
    </div>
  )
}

export default observer(ShotEditor)
