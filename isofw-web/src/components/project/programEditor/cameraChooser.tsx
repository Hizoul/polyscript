import { BlockTitle, Card, CardContent, CardHeader, Icon, List, ListItem, Popup, Row } from "framework7-react"
import useCameraChooser from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import { DbStore, MailField, toJS } from "isofw-shared/src/util/xpfwdata"
import { FormStore, IFieldProps } from "isofw-shared/src/util/xpfwform"
import { ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import "../style.sass"

const CameraChooser: React.FunctionComponent<IFieldProps & {inHeader?: boolean}> = observer((props) => {
  const chooserHelper = useCameraChooser(props.schema, props.mapTo, props.prefix)
  return (
    <>
      {props.inHeader ? (
        <div onClick={chooserHelper.showPop} className="flex verticalCenter">
          <NameDisplayer
            collection={val.service.camera}
            id={chooserHelper.value ? chooserHelper.value : get(FormStore.getValue(props.prefix, undefined, {}), `${ProjectCameras.title}[0]`)}
            getNameFrom={String(ProjectName.title)}
          />
          &nbsp;
          <Icon fa={"camera"} />
        </div>
      ) : (
        <li
          onClick={chooserHelper.showPop}
          className="flex verticalCenter"
          style={{width: 130, maxWidth: 130}}
        >
            <Icon fa={"camera"} />
            <NameDisplayer collection={val.service.camera} id={chooserHelper.value} getNameFrom={String(ProjectName.title)} placeholder="Select Camera" />
        </li>
      )}
      <Popup opened={chooserHelper.showPopUp} onPopupClosed={chooserHelper.hidePop} animate={false}>
        <BlockTitle>Choose a camera</BlockTitle>
        <List>
          {chooserHelper.cameras.map((camera: any) => <ListItem key={camera} onClick={() => {
            // TODO: do this in the hook itself instead of an onClick
            chooserHelper.hidePop()
            chooserHelper.setValueWithPreset(camera)
          }}>
                <div slot="title">
                  <NameDisplayer collection={val.service.camera} id={camera} getNameFrom={String(ProjectName.title)} /> -&nbsp;
                  {chooserHelper.operators[camera].map((operatorId: any) =>
                    <NameDisplayer collection={val.service.user} id={operatorId} getNameFrom={String(MailField.title)} />)}
                </div>
                <div slot="inner">
                  <Icon fa={"chevron"} />
                </div>
          </ListItem>)}
        </List>
      </Popup>
    </>
  )
})

export default CameraChooser
