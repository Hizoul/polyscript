import { MailField } from "@xpfw/data"
import { Link, List, ListItem, Popover } from "framework7-react"
import val from "isofw-shared/src/globals/val"
import { OperatorRelation, ProjectCameras, ProjectName,
  ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import I18n from "isofw-web/src/components/i18n"
import { get } from "lodash"
import * as React from "react"

const CurrentOperatorDisplay: React.FunctionComponent<any> = (props) => {
  const name = props.currentOperator && props.currentOperator.length > 0 ?
  <NameDisplayer collection={val.service.user} id={props.currentOperator} getNameFrom={String(MailField.title)} /> : "No one"
  return (
    <div>
      <Link popoverOpen=".operatorChooser" onClick={props.showOperatorChooser} className="subtitleBox centerText">
        <div className="subtitle">{name}</div>
        {props.currentCameras && props.currentCameras.length > 0 ? (
          <span>CA {props.currentCameras.map((camera: any) =>
            <NameDisplayer key={camera} collection={val.service.camera} id={camera} getNameFrom={String(ProjectName.title)} />)}</span>
        ) : <I18n text="operator.cameras.showAll" />}
      </Link>
      <Popover className="operatorChooser" opened={props.isOperatorChooserVisible}>
        <List>
          <ListItem onClick={props.changeOperator("")} popoverClose=".operatorChooser">
            <div slot="title"><I18n text="operator.cameras.all" />
            </div>
            <div slot="footer">
              <I18n text="operator.cameras.allCameras" />
            </div>
          </ListItem>
          {get(props.item, String(ProjectOperatorCameraMapping.title), []).map((mapping: any) => {
            const cameras = mapping[String(ProjectCameras.title)]
            return (
              <ListItem key={mapping[String(OperatorRelation.title)]} onClick={props.changeOperator(mapping[String(OperatorRelation.title)])} popoverClose={true}>
                <div slot="title">
                  <NameDisplayer collection={val.service.user} id={mapping[String(OperatorRelation.title)]} getNameFrom={String(MailField.title)} />
                </div>
                <div slot="footer">
                  {cameras && cameras.length > 0 ? (
                    <span><I18n text="operator.cameras.list" />{cameras.map((camera: any) =>
                      <NameDisplayer key={camera} collection={val.service.camera} id={camera} getNameFrom={String(ProjectName.title)} />)}
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
