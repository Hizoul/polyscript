import { Card, CardHeader, List, ListItem } from "framework7-react"
import useCameraDisabler from "isofw-shared/src/components/project/cameraDisabler"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { OperatorRelation, ProjectCameras } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { CameraNameDisplayer, UserNameDisplayer } from "../displayName"

const WebCameraDisabler: React.FunctionComponent<IFieldProps & {autoSave?: boolean}> = observer((props) => {
  const disableHelper = useCameraDisabler(props.schema, props.mapTo, props.prefix, props.autoSave)
  return (
    <div className="flex row center">
      {disableHelper.operatorCameraMapping.map((item) => {
        const operatorId = get(item, String(OperatorRelation.title))
        return (
          <Card key={operatorId} style={{minWidth: "10rem"}}>
            <List>
              <ListItem
                onClick={disableHelper.operatorToggles[operatorId]}
              >
                <div slot="title">
                  <UserNameDisplayer id={operatorId} />
                </div>
                <div slot="inner">
                  <div className={`dot ${disableHelper.isActive[operatorId] === true ? "green" : "red"}`} />
                </div>
              </ListItem>
              {get(item, String(ProjectCameras.title), []).map((cameraId: any) => (
                <ListItem
                  key={cameraId}
                  onClick={disableHelper.cameraToggles[cameraId]}
                >
                  <div slot="title">
                    <CameraNameDisplayer id={cameraId} />
                  </div>
                  <div slot="inner">
                  <div className={`dot ${disableHelper.isActive[cameraId] === true ? "green" : "red"}`} />
                  </div>
                </ListItem>
              ))}
            </List>
          </Card>
        )
      })}
    </div>
  )
})

export default WebCameraDisabler
