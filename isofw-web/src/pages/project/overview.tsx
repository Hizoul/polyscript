import "isofw-web/src/components/form"
import { BulmaList } from "@xpfw/ui-bulma"
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import ProjectOverviewComponent from "isofw-web/src/components/project/overview"
import { SharedField } from "@xpfw/form-shared";

const ProjectOverview: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer
      requireLoggedIn={true}
      name="projectOverview"
      title="Projects"
      subContent={<SharedField field={ProjectName} prefix={props.prefix} theme="search" />}
    >
      <ProjectOverviewComponent form={ProjectForm} prefix="projectOverview" />
    </WebPageContainer>
  )
}

export default ProjectOverview
