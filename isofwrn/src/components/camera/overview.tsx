import urls from "isofw-shared/src/globals/url"
import { IFormListProps, IFormShowProps, SharedFormList } from "isofw-shared/src/util/xpfwuishared"
import { CameraForm, CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NativeTable from "isofwrn/src/components/table"
import { get } from "lodash"
import * as React from "react"
import { View } from "react-native"

const NativeCameraOverview: React.FunctionComponent<IFormListProps> = (props) => {
  return (
    <View style={{flex: 1}}>
      <NativeTable
        data={get(props, "list.result", [])}
        rows={[ProjectName.mapTo, CameraIp.mapTo]}
        keyExtractor={(item) => item._id}
      />
      <NativeButton
        title="Create"
        icon={{name: "plus"}}
        iconRight={true}
        href={`${urls.create}/${CameraForm.collection}`}
      />
    </View>
  )
}

export default SharedFormList<{}>(NativeCameraOverview)
