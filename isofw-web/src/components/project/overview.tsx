import urls from "isofw-shared/src/globals/url"
import i18n from "isofw-shared/src/util/i18n"
import { IListHookProps, useList } from "isofw-shared/src/util/xpfwdata"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import ProjectActiveButton from "isofw-web/src/components/project/activityButton"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebButton from "../button"

const ItemProject: React.FunctionComponent<any> = (props) => {
  return (
    <tr>
      <td>{get(props.item, String(ProjectName.title))}</td>
      <td>
        <WebButton text="directorr" href={`${urls.directorPage}/${get(props.item, "_id")}`} />
        <WebButton text="programm" href={`${urls.programPage}/${get(props.item, "_id")}`} />
        <WebButton text="operatorr" href={`${urls.operatorInfo}/${get(props.item, "_id")}`} />
        <WebButton text="edit" href={`${urls.edit}/${ProjectForm.collection}/${get(props.item, "_id")}`} />
        <ProjectActiveButton id={get(props.item, "_id")} />
      </td>
    </tr>
  )
}

const ProjectOverviewComponent: React.FunctionComponent<IListHookProps> = observer((props) => {
  const listHelper = useList(ProjectForm, undefined, props.prefix, props.options)
  const items = get(listHelper, "list.data", []).map((item: any) => <ItemProject loading={false} item={item} key={item._id} />)
  return (
    <div className="data-table card">
      <table>
        <thead>
          <tr>
            <th>{i18n.t("name")}</th>
            <th>{i18n.t("actions")}</th>
          </tr>
        </thead>
        <tbody>
          {items}
        </tbody>
      </table>
      <WebButton
        text="Create"
        iconFa="plus"
        fill={true}
        href={`${urls.create}/${ProjectForm.collection}`}
        style={{margin: "0.5rem"}}
      />
    </div>
  )
})

export default ProjectOverviewComponent
