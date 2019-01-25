import { SharedField } from "@xpfw/form-shared"
import { CameraForm } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import CameraOverviewComponent from "isofw-web/src/components/camera/overview"
import "isofw-web/src/components/form"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import * as React from "react"

const CameraOverview: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer
      backLink={true}
      requireLoggedIn={true}
      name="cameraOverview"
      title="Cameras"
      subContent={<SharedField field={ProjectName} prefix="cameraOverview" theme="search" />}
    >
      <CameraOverviewComponent form={CameraForm} prefix="cameraOverview" />
    </WebPageContainer>
  )
}

export default CameraOverview
