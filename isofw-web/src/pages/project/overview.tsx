import "isofw-web/src/components/form"
import { BulmaList } from "@xpfw/ui-bulma"
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import "isofw-web/src/customizedBulma.sass"
import { ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import ProjectOverviewComponent from "isofw-web/src/components/project/overview"

const ProjectOverview: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer requireLoggedIn={true}>
      <ProjectOverviewComponent form={ProjectForm} prefix="projectOverview" />
    </WebPageContainer>
  )
}

export default ProjectOverview
