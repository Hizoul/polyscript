import { MailField } from "@xpfw/ui-shared"
import { Link, List, ListItem, Popover } from "framework7-react"
import SharedOperatorInfo, { SharedOperatorInfoProps } from "isofw-shared/src/components/project/operatorInfo"
import val from "isofw-shared/src/globals/val"
import { OperatorRelation, ProjectCameras, ProjectName,
  ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import { get } from "lodash"
import * as React from "react"

const CurrentOperatorDisplay: React.FunctionComponent<SharedOperatorInfoProps> = (props) => {
  const name = props.currentOperator && props.currentOperator.length > 0 ?
  <NameDisplayer collection={val.service.user} id={props.currentOperator} getNameFrom={MailField.mapTo} /> : "No one"
  return (
    <div>
      <Link popoverOpen=".operatorChooser" onClick={props.showOperatorChooser} className="subtitleBox centerText">
        <div className="subtitle">{name}</div>
        {props.currentCameras && props.currentCameras.length > 0 ? (
          <span>CA {props.currentCameras.map((camera) =>
            <NameDisplayer key={camera} collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />)}</span>
        ) : <span>Showing all cameras</span>}
      </Link>
      <Popover className="operatorChooser" opened={props.isOperatorChooserVisible}>
        <List>
          <ListItem onClick={props.changeOperator("")} popoverClose=".operatorChooser">
            <div slot="title">No one
            </div>
            <div slot="footer">
              All cameras
            </div>
          </ListItem>
          {get(props.item, ProjectOperatorCameraMapping.mapTo, []).map((mapping: any) => {
            const cameras = mapping[ProjectCameras.mapTo]
            return (
              <ListItem key={mapping[OperatorRelation.mapTo]} onClick={props.changeOperator(mapping[OperatorRelation.mapTo])} popoverClose={true}>
                <div slot="title">
                  <NameDisplayer collection={val.service.user} id={mapping[OperatorRelation.mapTo]} getNameFrom={MailField.mapTo} />
                </div>
                <div slot="footer">
                  {cameras && cameras.length > 0 ? (
                    <span>Cameras: {cameras.map((camera: any) =>
                      <NameDisplayer key={camera} collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />)}
                    </span>
                  ) : undefined}
                </div>
              </ListItem>
          )})}
        </List>
      </Popover>
    </div>
  )
}

export default CurrentOperatorDisplay
