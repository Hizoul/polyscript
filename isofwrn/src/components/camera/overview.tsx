import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import { IListHookProps, useList } from "isofw-shared/src/util/xpfwdata"
import { prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { CameraForm, CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NativeTable from "isofwrn/src/components/table"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text, View } from "react-native"
import { Card } from "react-native-elements"

const B: React.FunctionComponent<any> = (props) => {
  if (props.isHeader) {return <View key="b" />}
  return (
    <NativeButton
      key="b"
      title="Edit"
      iconRight={true}
      icon={{name: "edit", color: "white"}}
      href={urls.edit}
      hrefParams={{
        collection: val.service.camera,
        id: props.item._id
      }}
    />
  )
}

const NativeCameraOverview: React.FunctionComponent<IListHookProps> = observer((props) => {
  const listHelper = useList(CameraForm, undefined, props.prefix, props.options)
  return (
    <View style={{flex: 1}}>
      <SharedField schema={ProjectName} prefix={prependPrefix(CameraForm.title, "cameraOverview")} theme="search" />
      <Card containerStyle={{padding:  0}}>
        <NativeTable
          data={get(listHelper, "list.data", [])}
          rows={[String(ProjectName.title), String(CameraIp.title), B]}
          keyExtractor={(item) => item._id}
        />
        <NativeButton
          title="Create"
          icon={{name: "plus", type: "font-awesome", color: "white"}}
          iconRight={true}
          style={{marginTop: 10}}
          href={`${urls.create}`}
          hrefParams={{collection: CameraForm.collection}}
        />
      </Card>
    </View>
  )
})

export default NativeCameraOverview
