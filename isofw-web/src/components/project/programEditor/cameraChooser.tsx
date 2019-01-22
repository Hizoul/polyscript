import * as React from "react"
import WebButton from "isofw-web/src/components/button";
import "../style.sass"
import { List, Popup, Card, CardHeader, CardContent, ListItem, Icon, BlockTitle, Row } from "framework7-react";
import SharedCameraChoice, { SharedCameraChoiceProps } from "isofw-shared/src/components/project/cameraChooser";
import NameDisplayer from "isofw-web/src/components/displayName"
import val from "isofw-shared/src/globals/val";
import { MailField } from "isofw-shared/src/util/xpfwuishared";
import { find, get } from "lodash";
import { OperatorRelation, ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project";

const webCameraMapping: React.FunctionComponent<SharedCameraChoiceProps> = (props) => {
  console.log(" props are ",  props)
  return (
    <div>
      <ListItem
        onClick={props.togglePop}
      >
        <div slot="title">
          Camera:&nbsp;
          <NameDisplayer collection={val.service.camera} id={props.value} getNameFrom={ProjectName.mapTo} placeholder="not yet selected" />
        </div>
        <div slot="inner">
          <Icon fa={"camera"} />
        </div>
      </ListItem>
      <Popup opened={props.showPopUp} onPopupClosed={props.togglePop}>
        <BlockTitle>Choose a camera {props.field.mapTo}</BlockTitle>
        <List>
          {props.cameras.map((camera) => <ListItem key={camera} onClick={() => {
            props.togglePop(false)
            props.setValueWithPreset(camera)
          }}>
                <div slot="title">
                  <NameDisplayer collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />
                </div>
                <div slot="inner">
                  <Icon fa={"chevron"} />
                </div>
              </ListItem>)}
        </List>
      </Popup>
    </div>
  )
}

const WrappedCameraChooser = SharedCameraChoice(webCameraMapping) 
export default WrappedCameraChooser

