import { prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { CameraForm } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
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
      subContent={<SharedField schema={ProjectName} prefix={prependPrefix(CameraForm.title, "cameraOverview")} theme="search" />}
    >
      <CameraOverviewComponent schema={CameraForm} prefix="cameraOverview" />
    </WebPageContainer>
  )
}

export default CameraOverview
