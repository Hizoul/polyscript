import { BlockTitle, Card, CardContent, CardHeader, Icon, List, ListItem, Page, Popup, Row } from "framework7-react"
import useCameraMapping, { CameraMappingUtils } from "isofw-shared/src/components/project/cameraMapping"
import val from "isofw-shared/src/globals/val"
import { MailField } from "isofw-shared/src/util/xpfwdata"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { OperatorRelation, ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofw-web/src/components/displayName"
import { find, get } from "lodash"
import * as React from "react"
import "../style.sass"
import { observer } from "mobx-react-lite";

const OperatorCamera: React.FunctionComponent<any & {
  operator: string
  mapper: CameraMappingUtils
}> = (props) => {
  return (
    <Card>
      <CardHeader>
        <NameDisplayer collection={val.service.user} id={props.operator} getNameFrom={String(MailField.title)} />
      </CardHeader>
      <List className="noMargin">
        <ul>
          {props.cameras.map((camera: any) => {
            const operatorCameras = find(props.value, [OperatorRelation.title, props.operator])
            const selected = get(operatorCameras, String(ProjectCameras.title), []).indexOf(camera) !== -1
            return <ListItem key={camera} onClick={props.changeMapping(props.operator, camera)}>
              <div slot="title">
                <NameDisplayer collection={val.service.camera} id={camera} getNameFrom={String(ProjectName.title)} />
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

const webCameraMapping: React.FunctionComponent<IFieldProps> = observer((props) => {
  const mapper = useCameraMapping(props.schema, props.mapTo, props.prefix)
  return (
    <div>
      <WebButton
        fill={true}
        big={true}
        onClick={mapper.showPop}
        text="operator to camera mapping"
        iconFa="camera"
      />
      <Popup opened={mapper.showPopUp} onPopupClosed={mapper.hidePop}>
        <Page>
        <BlockTitle>select which operator handles which cameras</BlockTitle>
        {mapper.operators.map((operator: any) =>
          <OperatorCamera {...props} key={operator} operator={operator} mapper={mapper} />)}
        </Page>
      </Popup>
    </div>
  )
})

export default webCameraMapping
