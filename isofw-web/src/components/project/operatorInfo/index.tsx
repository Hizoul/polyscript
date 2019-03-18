import { Col, Icon, Link, Row } from "framework7-react"
import useOperatorInfo from "isofw-shared/src/components/project/operatorInfo"
import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import { IEditHookProps } from "isofw-shared/src/util/xpfwdata"
import { ProjectName, ProjectShot, ShotCamera, ShotName, ShotNumber } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofw-web/src/components/displayName"
import I18n from "isofw-web/src/components/i18n";
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import i18n from "../../../../../isofw-shared/src/util/i18n";
import LoadingPage from "../../loading"
import "../style.sass"
import CameraPresets from "./cameraPresets"
import CurrentOperatorDisplay from "./currentOperatorDisplay"
import TablePresetItem from "./tablePresetItem"

const OperatorInfo: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const previousPosition = React.useState(0)
  const operatorHelper = useOperatorInfo(props.id, props.mapTo, props.prefix)
  React.useEffect(() => {
    const newPosition = operatorHelper.currentShot
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
    <div className="data-table card" style={{overflowY: "scroll", marginLeft: "0pt", marginRight: "0pt"}}>
      <table>
        <thead>
          <tr>
            <th>{i18n.t("operator.table.shot")}</th>
            <th>{i18n.t("operator.table.camera")}</th>
            <th>{i18n.t("operator.table.preset")}</th>
            <th>{i18n.t("operator.table.importance")}</th>
            <th>{i18n.t("operator.table.name")}</th>
            <th>{i18n.t("operator.table.type")}</th>
            <th>{i18n.t("operator.table.movement")}</th>
            <th>{i18n.t("operator.table.towards")}</th>
            <th>{i18n.t("operator.table.duration")}</th>
            <th>{i18n.t("operator.table.picture")}</th>
            <th>{i18n.t("operator.table.remarks")}</th>
          </tr>
        </thead>
        <tbody>
          {operatorHelper.filteredList.map((item: any) => {
            i++
            return <TablePresetItem item={item} key={i} currentShot={operatorHelper.currentShot} />
          })}
        </tbody>
      </table>
    </div>
  )
  return (
    <div className="flex1 column" style={{maxHeight: "100%"}}>
      <Row>
        <Col>
            <div className="subtitleBox withPadding">
              <Link href={urls.projectOverview} className="flex">
                <div className="flex1 column">
                  <div className="subtitle"><I18n text="operator.project" /></div>
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
            <div className="subtitle"><I18n text="operator.currentShot" /></div>
            {operatorHelper.currentPreset ? (
              <div>
                {get(operatorHelper.currentPreset, String(ShotNumber.title), "")} &nbsp;
                {get(operatorHelper.currentPreset, String(ShotName.title), "")}
              </div>
            ) : null}
          </div>
        </Col>
      </Row>
      <Row className="marginTopBottom">
        <Col>
          <WebButton large={true} fill={true} text="operator.btns.ready" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="operator.btns.update" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="operator.btns.wide" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="operator.btns.stopZoom" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="operator.btns.tele" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="operator.btns.notReady" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton large={true} fill={true} text="operator.btns.autoScroll" iconFa="check" onClick={operatorHelper.submitEdit} loading={operatorHelper.loading} />
        </Col>
        <Col>
          <WebButton
            large={true}
            fill={true}
            text={operatorHelper.isPresetView ? "operator.btns.scriptView" : "operator.btns.presetView"}
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
