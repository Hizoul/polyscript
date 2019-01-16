import { SharedFormList, IFormListProps, IFormShowProps } from "isofw-shared/src/util/xpfwuishared"
import * as React from "react"
import { get } from "lodash"
import { SharedField } from "@xpfw/form-shared"
import { ProjectName, ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "../button"
import urls from "isofw-shared/src/globals/url"

const ItemProject: React.FunctionComponent<IFormShowProps> = (props) => {
  return (
    <tr>
      <td>{get(props.item, ProjectName.mapTo)}</td>
      <td>
        <WebButton text="director" href={`${urls.directorPage}/${get(props.item, "_id")}`} />
        <WebButton text="program" href={`${urls.programPage}/${get(props.item, "_id")}`} />
        <WebButton text="operator" href={`${urls.operatorInfo}/${get(props.item, "_id")}`} />
        <WebButton text="edit" href={`${urls.edit}/${ProjectForm.collection}/${get(props.item, "_id")}`} />
      </td>
    </tr>
  )
}

const ProjectOverviewComponent: React.FunctionComponent<IFormListProps> = (props) => {
  const items = get(props, "list.result", []).map((item: any) => <ItemProject loading={false} item={item} />)
  return (
    <div className="data-table card">
      <table>
        <thead>
          <th>name</th>
          <th>actions</th>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
      <WebButton text="Create" iconFa="plus" fill href={`${urls.create}/${ProjectForm.collection}`} style={{margin: "0.5rem"}} />
    </div>
  )
}

export default SharedFormList<{}>(ProjectOverviewComponent)