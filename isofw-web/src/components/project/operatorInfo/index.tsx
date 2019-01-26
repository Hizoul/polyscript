import { DbStore, IFormEditProps, IFormShowProps, SharedFormEdit } from "@xpfw/ui-shared"
import { Block, Col, Icon, Link, Row } from "framework7-react"
import SharedOperatorInfo, {
  SharedOperatorInfoProps } from "isofw-shared/src/components/project/operatorInfo"
import urls from "isofw-shared/src/globals/url"
import WebButton from "isofw-web/src/components/button"
import { get } from "lodash"
import * as React from "react"
import LoadingPage from "../../loading"
import "../style.sass"
import CameraPresets from "./cameraPresets"
import CurrentOperatorDisplay from "./currentOperatorDisplay"
import TablePresetItem from "./tablePresetItem"

const OperatorInfo: React.FunctionComponent<IFormEditProps & SharedOperatorInfoProps> = (props) => {
  let i = 0
  const content = props.isPresetView ? (
    <div>
      {props.presetByCamera.map((item: any) => {
            i++
            if (props.currentCameras.length > 0 && props.currentCameras.indexOf(item.camera) === -1) {return null}
            return <CameraPresets loading={false} item={item} key={item.camera} />
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
            <th>Type</th>
            <th>Object</th>
            <th>Movement</th>
            <th>Towards</th>
            <th>Duration</th>
            <th>picture</th>
            <th>remarks</th>
          </tr>
        </thead>
        <tbody>
          {props.filteredList.map((item: any) => {
            i++
            return <TablePresetItem loading={false} item={item} key={i} index={i} />
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
                  {get(props, "original.result.name")}
                </div>
                <Icon fa="th-list" />
              </Link>
            </div>
        </Col>
        <Col>
          <CurrentOperatorDisplay {...props} />
        </Col>
        <Col>
          <div className="subtitleBox withPadding">
            <div className="subtitle">Current shot</div>
            3
          </div>
        </Col>
      </Row>
      <Row className="marginTopBottom">
        <Col>
          <WebButton big={true} fill={true} text="shot ready" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big={true} fill={true} text="update preset" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big={true} fill={true} text="wide" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big={true} fill={true} text="stop zoom" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big={true} fill={true} text="tele" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big={true} fill={true} text="not ready" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big={true} fill={true} text="following position" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton
            big={true}
            fill={true}
            text={props.isPresetView ? "script view" : "preset view"}
            iconFa={props.isPresetView ? "list-ol" : "images"}
            onClick={props.isPresetView ? props.useScriptView : props.usePresetView}
          />
        </Col>
      </Row>
      {content}
      {props.loading ? <LoadingPage /> : null}
    </div>
  )
}
const c: any = OperatorInfo
const b: any = SharedOperatorInfo(c)
export default SharedFormEdit<any>(b)
