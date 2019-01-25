import { SharedField } from "@xpfw/form-shared"
import urls from "isofw-shared/src/globals/url"
import { IFormListProps, IFormShowProps, SharedFormList } from "isofw-shared/src/util/xpfwuishared"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import * as React from "react"
import WebButton from "../button"

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
  const items = get(props, "list.result", []).map((item: any) => <ItemProject loading={false} item={item} key={item._id} />)
  return (
    <div className="data-table card">
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
      <WebButton text="Create" iconFa="plus" fill={true} href={`${urls.create}/${ProjectForm.collection}`} style={{margin: "0.5rem"}} />
    </div>
  )
}

export default SharedFormList<{}>(ProjectOverviewComponent)
