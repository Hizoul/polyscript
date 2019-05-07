import { Col,  Row } from "framework7-react"
import useCameraActions from "isofw-shared/src/components/project/cameraActions"
import { ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import { observer } from "mobx-react-lite"
import * as React from "react"

const CameraActions: React.FunctionComponent<any> = observer((props) => {
  const actionHelper = useCameraActions(ShotCamera, undefined, props.prefix)
  return (
    <Row className="marginTopBottom">
      <Col>
        <WebButton large={true} fill={true} text="operator.btns.ready" iconFa="check" onClick={actionHelper.setReady} loading={actionHelper.loading} />
      </Col>
      <Col>
        <WebButton large={true} fill={true} text="operator.btns.update" iconFa="check" onClick={actionHelper.savePreset} loading={actionHelper.loading} />
      </Col>
      <Col>
        <WebButton large={true} fill={true} text="operator.btns.wide" iconFa="check" onClick={actionHelper.wideZoom} loading={actionHelper.loading} />
      </Col>
      <Col>
        <WebButton large={true} fill={true} text="operator.btns.stopZoom" iconFa="check" onClick={actionHelper.stopZoom} loading={actionHelper.loading} />
      </Col>
      <Col>
        <WebButton large={true} fill={true} text="operator.btns.tele" iconFa="check" onClick={actionHelper.teleZoom} loading={actionHelper.loading} />
      </Col>
      <Col>
        <WebButton large={true} fill={true} text="operator.btns.notReady" iconFa="check" onClick={actionHelper.setNotReady} loading={actionHelper.loading} />
      </Col>
      {/* <Col>
        <WebButton large={true} fill={true} text="operator.btns.autoScroll" iconFa="check" onClick={actionHelper.submitEdit} loading={actionHelper.loading} />
      </Col> */}
      {props.children}
    </Row>
  )
})

export default CameraActions
