import { ComponentRegistry } from "@xpfw/form-shared"
import { FormStore, SharedField } from "@xpfw/form-shared"
import { DbStore, IFormEditProps, IFormShowProps, SharedFormEdit } from "@xpfw/ui-shared"
import { Block, Col, Icon, Link, Row } from "framework7-react"
import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import { FieldType } from "isofw-shared/src/util/xpfwvalidate"
import { ProjectForm, ProjectName, ProjectProgram, ProjectShot, ShotCamera, ShotDuration, ShotMovement, ShotMovementTowards, ShotName, ShotPreset, ShotRemarksDirector, ShotRemarksOperator, ShotType } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import * as React from "react"
import SharedOperatorInfo, { SharedOperatorInfoProps } from "../../../../../isofw-shared/src/components/project/operatorInfo"
import { PresetNumberField } from "../../../../../isofw-shared/src/xpfwDefs/preset"
import LoadingPage from "../../loading"
import "../style.sass"
import CurrentOperatorDisplay from "./currentOperatorDisplay"

const PresetItem: React.FunctionComponent<IFormShowProps & {index: number}> = (props) => {
  return (
    <tr>
      <td>{props.index}</td>
      <td>
        <NameDisplayer collection={val.service.camera} id={get(props.item, ShotCamera.mapTo)} getNameFrom={ProjectName.mapTo} placeholder="" />
      </td>
      <td>
        <NameDisplayer collection={val.service.preset} id={get(props.item, ShotPreset.mapTo)} getNameFrom={PresetNumberField.mapTo} placeholder="" />
      </td>
      <td>{get(props.item, ShotType.mapTo)}</td>
      <td>{get(props.item, ShotName.mapTo)}</td>
      <td>{get(props.item, ShotMovement.mapTo)}</td>
      <td>{get(props.item, ShotMovementTowards.mapTo)}</td>
      <td>{get(props.item, ShotDuration.mapTo)}</td>
      <td>{get(props.item, ProjectName.mapTo)}</td>
      <td>
        {get(props.item, ShotRemarksDirector.mapTo)}<br />
        {get(props.item, ShotRemarksOperator.mapTo)}
      </td>
    </tr>
  )
}

const OperatorInfo: React.FunctionComponent<IFormEditProps & SharedOperatorInfoProps> = (props) => {
  let i = 0
  const items = props.filteredList.map((item: any) => {
    i++
    return <PresetItem loading={false} item={item} key={i} index={i} />
  })
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
          <WebButton big={true} fill={true} text="script view" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big={true} fill={true} text="preset view" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
      </Row>
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
            {items}
          </tbody>
        </table>
      </div>
      {props.loading ? <LoadingPage /> : null}
    </div>
  )
}
const c: any = OperatorInfo
const b: any = SharedOperatorInfo(c)
export default SharedFormEdit<any>(b)
