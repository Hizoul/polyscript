import { Col, Icon, Link, Row } from "framework7-react"
import useOperatorInfo from "isofw-shared/src/components/project/operatorInfo"
import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import { IEditHookProps } from "isofw-shared/src/util/xpfwdata"
import { ProjectName, ProjectShot, ShotCamera, ShotName } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import LoadingPage from "../../loading"
import "../style.sass"
import CameraPresets from "./cameraPresets"
import CurrentOperatorDisplay from "./currentOperatorDisplay"
import TablePresetItem from "./tablePresetItem"

const OperatorInfo: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const previousPosition = React.useState(0)
  const operatorHelper = useOperatorInfo(props.id, props.mapTo, props.prefix)
  React.useEffect(() => {
    const newPosition = get(operatorHelper.original, String(ProjectShot.title))
    if (newPosition !== previousPosition[0]) {
      previousPosition[1](newPosition)
      const element = document.getElementById(`presetPositioner${newPosition}`)
      if (element != null) {
        element.scrollIntoView({
          behavior: "smooth", block: "center", inline: "center"
        })
      }
    }
  })
  let i = 0
  const content = operatorHelper.isPresetView ? (
    <div>
      {operatorHelper.presetByCamera.map((item: any) => {
            i++
            if (operatorHelper.currentCameras.length > 0 &&
              operatorHelper.currentCameras.indexOf(item.camera) === -1) {return null}
            return <CameraPresets item={item} key={item.camera} />
          })}
    </div>
  ) : (
    <div className="data-table card" style={{marginLeft: "0pt", marginRight: "0pt"}}>
      <table>
        <thead>
          <tr>
            <th>shot</th>
            <th>CA</th>
            <th>Preset</th>
            <th>!</th>
            <th>name</th>
            <th>Type</th>
            <th>Movement</th>
            <th>Towards</th>
            <th>Duration</th>
            <th>picture</th>
            <th>remarks</th>
          </tr>
        </thead>
        <tbody>
          {operatorHelper.filteredList.map((item: any) => {
            i++
            return <TablePresetItem item={item} key={i} />
          })}
        </tbody>
      </table>
    </div>
  )
  return (
    <div>
      <Row>
        <Col>
            <div className="subtitleBox withPadding">
              <Link href={urls.projectOverview} className="flex">
                <div className="flex1 column">
                  <div className="subtitle">active project</div>
                  {get(operatorHelper, "original.name")}
                </div>
                <Icon fa="th-list" />
              </Link>
            </div>
        </Col>
        <Col>
          <CurrentOperatorDisplay {...props} {...operatorHelper} />
        </Col>
        <Col>
          <div className="subtitleBox withPadding">
            <div className="subtitle">Current shot</div>
            {operatorHelper.currentPreset ? (
              <div>
                <NameDisplayer
                  collection={val.service.camera}
                  id={get(operatorHelper.currentPreset, String(ShotCamera.title))}
                  getNameFrom={String(ProjectName.title)}
                  placeholder=""
                /> &nbsp;
                {get(operatorHelper.currentPreset, String(ShotName.title), "")}
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
      <Row className="marginTopBottom">
        <Col>
          <WebButton large={true} fill={true} text="shot ready" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="update preset" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="wide" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="stop zoom" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="tele" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="not ready" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="following position" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton
            large={true}
            fill={true}
            text={operatorHelper.isPresetView ? "script view" : "preset view"}
            iconFa={operatorHelper.isPresetView ? "list-ol" : "images"}
            onClick={operatorHelper.isPresetView ? operatorHelper.useScriptView : operatorHelper.usePresetView}
          />
        </Col>
      </Row>
      {content}
      {operatorHelper.loading ? <LoadingPage /> : null}
    </div>
  )
})
export default OperatorInfo
