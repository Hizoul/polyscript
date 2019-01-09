import { SharedFormList, IFormListProps, IFormShowProps } from "isofw-shared/src/util/xpfwuishared"
import * as React from "react"
import { get } from "lodash"
import { SharedField } from "@xpfw/form-shared"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "../button"
import urls from "isofw-shared/src/globals/url"

const  ItemProject: React.FunctionComponent<IFormShowProps> = (props) => {
  return (
    <div className="box">
      {get(props.item, ProjectName.mapTo)}
      <WebButton text="director" to={`${urls.directorPage}/${get(props.item, "_id")}`} />
      <WebButton text="program" to={`${urls.programPage}/${get(props.item, "_id")}`} />
    </div>
  )
}

const  ProjectOverviewComponent: React.FunctionComponent<IFormListProps> = (props) => {
  const items =  get(props, "list.result", []).map((item: any) => <ItemProject loading={false} item={item} />)
  return (
    <div className="flex1">
      <div>
        <SharedField field={ProjectName} prefix={props.prefix} />
      </div>
      {items}
    </div>
  )
}

export default SharedFormList<{}>(ProjectOverviewComponent)