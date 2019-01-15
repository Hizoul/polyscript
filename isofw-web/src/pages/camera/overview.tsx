import "isofw-web/src/components/form"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import { CameraForm } from "isofw-shared/src/xpfwDefs/camera"
import CameraOverviewComponent from "isofw-web/src/components/camera/overview"
import { SharedField } from "@xpfw/form-shared"

const CameraOverview: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer
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
