import * as React from "react"
import { SharedFormEdit, IFormEditProps, DbStore, IFormShowProps } from "@xpfw/ui-shared";
import { ProjectForm, ProjectShot, ProjectProgram, ProjectName, ShotName, ShotType, ShotMovement, ShotMovementTowards, ShotDuration, ShotRemarksDirector, ShotRemarksOperator } from "isofw-shared/src/xpfwDefs/project";
import { FormStore, SharedField } from "@xpfw/form-shared";
import LoadingPage from "../loading";
import { get } from "lodash"
import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "isofw-shared/src/util/xpfwvalidate";
import WebButton from "isofw-web/src/components/button";
import { Row, Col, Block, Link, Icon } from "framework7-react";
import "./style.sass"
import urls from "isofw-shared/src/globals/url";

const PresetItem: React.FunctionComponent<IFormShowProps> = (props) => {
  return (
    <tr>
      <td>{get(props.item, ProjectName.mapTo)}</td>
      <td>{get(props.item, ProjectName.mapTo)}</td>
      <td>{get(props.item, ProjectName.mapTo)}</td>
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

const OperatorInfo: React.FunctionComponent<IFormEditProps> = (props) => {
  console.log(" operator props ", props, get(props.original, ProjectProgram.mapTo, []))
  let i = 0
  const items = get(props.original, `result.${ProjectProgram.mapTo}`, []).map((item: any) => <PresetItem loading={false} item={item} key={++i} />)
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
          <div className="subtitleBox centerText">
            <div className="subtitle">Operator info</div>
            CA 5 6 9
          </div>
        </Col>
        <Col>
          <div className="subtitleBox withPadding">
            <div className="subtitle">Current shot</div>
            5
          </div>
        </Col>
      </Row>
      <Row className="marginTopBottom">
        <Col>
          <WebButton big fill text="shot ready" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big fill text="update preset" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big fill text="wide" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big fill text="stop zoom" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big fill text="tele" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big fill text="not ready" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big fill text="following position" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big fill text="script view" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
        </Col>
        <Col>
          <WebButton big fill text="preset view" iconFa="check" onClick={props.submitEdit} loading={props.loading} />
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

export default SharedFormEdit<{}>(OperatorInfo)