import "isofw-web/src/components/form"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import ProjectOverviewComponent from "isofw-web/src/components/project/overview"
import { SharedField } from "@xpfw/form-shared";

const CameraOverview: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer
      requireLoggedIn={true}
      name="cameraOverview"
      title="Cameras"
      subContent={<SharedField field={ProjectName} prefix={props.prefix} theme="search" />}
    >
      <ProjectOverviewComponent form={ProjectForm} prefix="cameraOverview" />
    </WebPageContainer>
  )
}

export default CameraOverview
