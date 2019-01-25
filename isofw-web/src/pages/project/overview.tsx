import { SharedField } from "@xpfw/form-shared"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import "isofw-web/src/components/form"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import ProjectOverviewComponent from "isofw-web/src/components/project/overview"
import * as React from "react"

const ProjectOverview: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer
      backLink={true}
      requireLoggedIn={true}
      name="projectOverview"
      title="Projects"
      subContent={<SharedField field={ProjectName} prefix="projectOverview" theme="search" />}
    >
      <ProjectOverviewComponent form={ProjectForm} prefix="projectOverview" />
    </WebPageContainer>
  )
}

export default ProjectOverview
