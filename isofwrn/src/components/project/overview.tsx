import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import { SharedField } from "isofw-shared/src/util/xpfwformshared"
import { IFormListProps, IFormShowProps, SharedFormList } from "isofw-shared/src/util/xpfwuishared"
import { CameraForm, CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NativeTable from "isofwrn/src/components/table"
import { get } from "lodash"
import * as React from "react"
import { Text, View } from "react-native"
import { Card } from "react-native-elements"

const Actions: React.FunctionComponent<any> = (props) => {
  if (props.isHeader) {return <View />}
  return (
    <View>
      <NativeButton
        title="director"
        iconRight={true}
        icon={{name: "info"}}
        href={urls.directorPage}
        hrefParams={{id: get(props, "item._id")}}
      />
      <NativeButton
        title="program"
        iconRight={true}
        icon={{name: "info"}}
        href={urls.programPage}
        hrefParams={{id: get(props, "item._id")}}
      />
      <NativeButton
        title="Operator"
        iconRight={true}
        icon={{name: "info"}}
        href={urls.operatorInfo}
        hrefParams={{id: get(props, "item._id")}}
      />
      <NativeButton
        title="Edit"
        iconRight={true}
        icon={{name: "edit"}}
        href={urls.edit}
        hrefParams={{
          collection: val.service.project,
          id: props.item._id
        }}
      />
    </View>
  )
}

const NativeProjectOverview: React.FunctionComponent<IFormListProps> = (props) => {
  return (
    <View style={{flex: 1}}>
      <SharedField field={ProjectName} prefix="projectOverview" theme="search" />
      <Card containerStyle={{padding:  0}}>
        <NativeTable
          data={get(props, "list.result", [])}
          rows={[ProjectName.mapTo, Actions]}
          keyExtractor={(item) => item._id}
        />
        <NativeButton
          title="Create"
          icon={{name: "plus", type: "font-awesome"}}
          iconRight={true}
          style={{marginTop: 10}}
          href={`${urls.create}`}
          hrefParams={{collection: ProjectForm.collection}}
        />
      </Card>
    </View>
  )
}

export default SharedFormList<{}>(NativeProjectOverview)
