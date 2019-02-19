import { BlockTitle, Card, CardContent, CardHeader, Icon, List, ListItem, Popup, Row } from "framework7-react"
import useCameraChooser from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import * as React from "react"
import "../style.sass"

const CameraChooser: React.FunctionComponent<IFieldProps> = (props) => {
  const chooserHelper = useCameraChooser(props.schema, props.mapTo, props.prefix)
  return (
    <div>
      <ListItem
        onClick={chooserHelper.showPop}
      >
        <div slot="title">
          Camera:&nbsp;
          <NameDisplayer collection={val.service.camera} id={chooserHelper.value} getNameFrom={String(ProjectName.title)} placeholder="not yet selected" />
        </div>
        <div slot="inner">
          <Icon fa={"camera"} />
        </div>
      </ListItem>
      <Popup opened={chooserHelper.showPopUp} onPopupClosed={chooserHelper.hidePop}>
        <BlockTitle>Choose a camera {props.schema.title}</BlockTitle>
        <List>
          {chooserHelper.cameras.map((camera: any) => <ListItem key={camera} onClick={() => {
            // TODO: do this in the hook itself instead of an onClick
            chooserHelper.hidePop()
            chooserHelper.setValueWithPreset(camera)
          }}>
                <div slot="title">
                  <NameDisplayer collection={val.service.camera} id={camera} getNameFrom={String(ProjectName.title)} />
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

export default CameraChooser
