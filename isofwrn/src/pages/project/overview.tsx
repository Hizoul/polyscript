import { ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import NativePageContained from "isofwrn/src/components/pageContainer"
import NativeProjectOverviewComponent from "isofwrn/src/components/project/overview"
import * as React from "react"

const NativeCameraOverview: React.FunctionComponent<any> = (props) => {
  return (
    <NativePageContained {...props} title="Projects">
      <NativeProjectOverviewComponent schema={ProjectForm} prefix="projectOverview" />
    </NativePageContained>
  )
}

export default NativeCameraOverview
