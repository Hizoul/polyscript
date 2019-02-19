import { SharedField } from "@xpfw/form"
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
      subContent={<SharedField schema={ProjectName} prefix="projectOverview" theme="search" />}
    >
      <ProjectOverviewComponent schema={ProjectForm} prefix="projectOverview" />
    </WebPageContainer>
  )
}

export default ProjectOverview
