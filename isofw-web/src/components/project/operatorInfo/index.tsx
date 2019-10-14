import { Col, Icon, Link, Row } from "framework7-react"
import useOperatorInfo from "isofw-shared/src/components/project/operatorInfo"
import urls from "isofw-shared/src/globals/url"
import i18n from "isofw-shared/src/util/i18n"
import { IEditHookProps } from "isofw-shared/src/util/xpfwdata"
import { prependPrefix } from "isofw-shared/src/util/xpfwform"
import { ProjectForm, ShotName, ShotNumber } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import I18n from "isofw-web/src/components/i18n"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import LoadingPage from "../../loading"
import "../style.sass"
import CameraActions from "./cameraActions"
import CameraPresets from "./cameraPresets"
import CurrentOperatorDisplay from "./currentOperatorDisplay"
import TablePresetItem from "./tablePresetItem"

const OperatorInfo: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const previousPosition = React.useState(0)
  const operatorHelper = useOperatorInfo(props.id, props.mapTo, props.prefix)
  React.useEffect(() => {
    if (operatorHelper.autoScrollEnabled) {
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
            <th>{i18n.t("operator.table.remarks")}</th>
          </tr>
        </thead>
        <tbody>
          {operatorHelper.filteredList.map((item: any) => {
            i++
            return <TablePresetItem item={item} key={i} currentShot={(operatorHelper.currentShot + 1)} />
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
          <div className="subtitleBox withPadding isActive">
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
      <CameraActions prefix={prependPrefix(ProjectForm.title, props.prefix)}>
      <Col>
        <WebButton
          large={true}
          fill={true}
          text={operatorHelper.autoScrollEnabled ? "operator.btns.disableAutoScroll" : "operator.btns.enableAutoScroll"}
          iconFa={operatorHelper.autoScrollEnabled ? "angle-double-down" : "angle-double-right"}
          onClick={operatorHelper.autoScrollEnabled ? operatorHelper.disableAutoScroll : operatorHelper.enableAutoScroll}
        />
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
      </CameraActions>
      {content}
      {operatorHelper.loading ? <LoadingPage /> : null}
    </div>
  )
})
export default OperatorInfo
