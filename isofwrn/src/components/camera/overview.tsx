import urls from "isofw-shared/src/globals/url"
import { SharedField } from "isofw-shared/src/util/xpfwformshared"
import { IFormListProps, IFormShowProps, SharedFormList } from "isofw-shared/src/util/xpfwuishared"
import { CameraForm, CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NativeTable from "isofwrn/src/components/table"
import { get } from "lodash"
import * as React from "react"
import { Text, View } from "react-native"
import { Card } from "react-native-elements"

const B: React.FunctionComponent<any> = (props) => {
  return <NativeButton title="Edit" iconRight={true} icon={{name: "edit"}} />
}

const NativeCameraOverview: React.FunctionComponent<IFormListProps> = (props) => {
  return (
    <View style={{flex: 1}}>
      <SharedField field={ProjectName} prefix="cameraOverview" theme="search" />
      <Card containerStyle={{padding:  0}}>
        <NativeTable
          data={get(props, "list.result", [])}
          rows={[ProjectName.mapTo, CameraIp.mapTo, B]}
          keyExtractor={(item) => item._id}
        />
        <NativeButton
          title="Create"
          icon={{name: "plus", type: "font-awesome"}}
          iconRight={true}
          style={{marginTop: 10}}
          href={`${urls.create}/${CameraForm.collection}`}
        />
      </Card>
    </View>
  )
}

export default SharedFormList<{}>(NativeCameraOverview)
