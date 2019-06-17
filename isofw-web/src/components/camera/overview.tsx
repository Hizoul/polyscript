import urls from "isofw-shared/src/globals/url"
import { IListHookProps, useList } from "isofw-shared/src/util/xpfwdata"
import { CameraForm, CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import i18n from "isofw-shared/src/util/i18n"
import WebButton from "../button"
import ListFooter from "../listFooter"

const ItemCamera: React.FunctionComponent<any> = (props) => {
  return (
    <tr>
      <td>{get(props.item, String(ProjectName.title))}</td>
      <td>{get(props.item, String(CameraIp.title))}</td>
      <td>
        <WebButton text="Edit" iconFa="edit" href={`${urls.edit}/${CameraForm.collection}/${get(props.item, "_id")}`} />
      </td>
    </tr>
  )
}

const CameraOverviewComponent: React.FunctionComponent<IListHookProps> = observer((props) => {
  const listHelper = useList(CameraForm, undefined, props.prefix, props.options)
  const items = get(listHelper, "list.data", []).map((item: any) => <ItemCamera loading={false} item={item} key={item._id} />)
  return (
    <div className="data-table card">
      <table>
        <thead>
          <tr>
            <th>{i18n.t("name")}</th>
            <th>{i18n.t("ip")}</th>
            <th>{i18n.t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
      <ListFooter createLink={`${urls.create}/${CameraForm.collection}`} listHelper={listHelper} />
    </div>
  )
})

export default CameraOverviewComponent
