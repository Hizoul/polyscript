import { SharedFormList, IFormListProps, IFormShowProps } from "isofw-shared/src/util/xpfwuishared"
import * as React from "react"
import { get } from "lodash"
import { SharedField } from "@xpfw/form-shared"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import { CameraIp, CameraForm } from "isofw-shared/src/xpfwDefs/camera"
import WebButton from "../button"
import urls from "isofw-shared/src/globals/url"

const ItemCamera: React.FunctionComponent<IFormShowProps> = (props) => {
  return (
    <tr>
      <td>{get(props.item, ProjectName.mapTo)}</td>
      <td>{get(props.item, CameraIp.mapTo)}</td>
      <td>
        <WebButton text="Edit" iconFa="edit" href={`${urls.edit}/${CameraForm.collection}/${get(props.item, "_id")}`} />
      </td>
    </tr>
  )
}

const CameraOverviewComponent: React.FunctionComponent<IFormListProps> = (props) => {
  const items = get(props, "list.result", []).map((item: any) => <ItemCamera loading={false} item={item} />)
  return (
    <div className="data-table card">
      <table>
        <thead>
          <th>name</th>
          <th>IP</th>
          <th>actions</th>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
      <WebButton text="Create" iconFa="plus" fill href={`${urls.create}/${CameraForm.collection}`} style={{margin: "0.5rem"}} />
    </div>
  )
}

export default SharedFormList<{}>(CameraOverviewComponent)