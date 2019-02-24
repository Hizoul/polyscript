import { CameraForm } from "isofw-shared/src/xpfwDefs/camera"
import NativeCameraOverviewComponent from "isofwrn/src/components/camera/overview"
import NativePageContained from "isofwrn/src/components/pageContainer"
import * as React from "react"
import { Text } from "react-native"

const NativeCameraOverview: React.FunctionComponent<any> = (props) => {
  return (
    <NativePageContained {...props} title="PolyScript">
      <NativeCameraOverviewComponent schema={CameraForm} />
    </NativePageContained>
  )
}

export default NativeCameraOverview
