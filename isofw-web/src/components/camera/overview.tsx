import urls from "isofw-shared/src/globals/url"
import { IFormListProps, IFormShowProps, SharedFormList } from "isofw-shared/src/util/xpfwuishared"
import { CameraForm, CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import * as React from "react"
import WebButton from "../button"

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
  const items = get(props, "list.result", []).map((item: any) => <ItemCamera loading={false} item={item} key={item._id} />)
  return (
    <div className="data-table card">
      <table>
        <thead>
          <tr>
            <th>name</th>
            <th>IP</th>
            <th>actions</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
      <WebButton text="Create" iconFa="plus" fill={true} href={`${urls.create}/${CameraForm.collection}`} style={{margin: "0.5rem"}} />
    </div>
  )
}

export default SharedFormList<{}>(CameraOverviewComponent)
