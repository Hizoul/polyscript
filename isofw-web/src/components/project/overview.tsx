import urls from "isofw-shared/src/globals/url"
import i18n from "isofw-shared/src/util/i18n"
import { IListHookProps, useList } from "isofw-shared/src/util/xpfwdata"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import ProjectActiveButton from "isofw-web/src/components/project/activityButton"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebButton from "../button"
import I18n from "../i18n";
import ListFooter from "../listFooter";

const ItemProject: React.FunctionComponent<any> = (props) => {
  return (
    <tr>
      <td>{get(props.item, String(ProjectName.title))}</td>
      <td>
        <WebButton text="project.direct" iconFa="sort-numeric-down" href={`${urls.directorPage}/${get(props.item, "_id")}`} />
        <WebButton text="project.program" iconFa="list" href={`${urls.programPage}/${get(props.item, "_id")}`} />
        <WebButton text="project.operate" iconFa="video" href={`${urls.operatorInfo}/${get(props.item, "_id")}`} />
        <WebButton text="project.edit" iconFa="edit" href={`${urls.edit}/${ProjectForm.collection}/${get(props.item, "_id")}`} />
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
      <ListFooter createLink={`${urls.create}/${ProjectForm.collection}`} listHelper={listHelper} />
    </div>
  )
})

export default ProjectOverviewComponent
