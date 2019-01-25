import { BlockTitle, Card, CardContent, CardHeader, Icon, List, ListItem, Popup, Row } from "framework7-react"
import SharedCameraMapping, { SharedCameraMappingProps } from "isofw-shared/src/components/project/cameraMapping"
import val from "isofw-shared/src/globals/val"
import { MailField } from "isofw-shared/src/util/xpfwuishared"
import { OperatorRelation, ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofw-web/src/components/displayName"
import { find, get } from "lodash"
import * as React from "react"
import "../style.sass"

const OperatorCamera: React.FunctionComponent<SharedCameraMappingProps & {operator: string}> = (props) => {
  return (
    <Card>
      <CardHeader>
        <NameDisplayer collection={val.service.user} id={props.operator} getNameFrom={MailField.mapTo} />
      </CardHeader>
      <List className="noMargin">
        <ul>
          {props.cameras.map((camera) => {
            const operatorCameras = find(props.value, [OperatorRelation.mapTo, props.operator])
            const selected = get(operatorCameras, ProjectCameras.mapTo, []).indexOf(camera) !== -1
            return <ListItem key={camera} onClick={props.changeMapping(props.operator, camera)}>
              <div slot="title">
                <NameDisplayer collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />
              </div>
              <div slot="inner">
                <Icon fa={selected ? "times" : "plus"} color={selected ? "red" : "green"}/>
              </div>
            </ListItem>
          })}
        </ul>
      </List>
    </Card>
  )
}

const webCameraMapping: React.FunctionComponent<SharedCameraMappingProps> = (props) => {
  return (
    <div>
      <WebButton
        fill={true}
        big={true}
        onClick={props.togglePop}
        text="operator to camera mapping"
        iconFa="camera"
      />
      <Popup opened={props.showPopUp} onPopupClosed={props.togglePop}>
        <BlockTitle>select which operator handles which cameras</BlockTitle>
        {props.operators.map((operator) => <OperatorCamera {...props} key={operator} operator={operator} />)}
      </Popup>
    </div>
  )
}

const WrappedCameraMapping = SharedCameraMapping(webCameraMapping)
export default WrappedCameraMapping

