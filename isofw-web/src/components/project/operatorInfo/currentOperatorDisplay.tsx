import * as React from "react"
import NameDisplayer from "isofw-web/src/components/displayName"
import SharedOperatorInfo, { SharedOperatorInfoProps } from "isofw-shared/src/components/project/operatorInfo"
import { MailField } from "@xpfw/ui-shared";
import val from "isofw-shared/src/globals/val";
import { ProjectName, ProjectOperatorCameraMapping, OperatorRelation, ProjectCameras } from "isofw-shared/src/xpfwDefs/project";
import { Popover, List, ListItem, Link } from "framework7-react";
import { get } from "lodash";

const CurrentOperatorDisplay: React.FunctionComponent<SharedOperatorInfoProps> = (props) => {
  const name = props.currentOperator && props.currentOperator.length > 0 ?
  <NameDisplayer collection={val.service.user} id={props.currentOperator} getNameFrom={MailField.mapTo} /> : "none selected"
  return (
    <div>
      <Link popoverOpen=".operatorChooser" className="subtitleBox centerText">
        <div className="subtitle">{name}</div>
        {props.currentCameras && props.currentCameras.length > 0 ? (
          <span>CA {props.currentCameras.map((camera) => 
            <NameDisplayer key={camera} collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />)}</span>
        ) : <span>&nbsp;</span>}
      </Link>
      <Popover className="operatorChooser">
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
              <ListItem key={mapping[OperatorRelation.mapTo]} onClick={props.changeOperator(mapping[OperatorRelation.mapTo])} popoverClose>
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

export default SharedOperatorInfo(CurrentOperatorDisplay)
