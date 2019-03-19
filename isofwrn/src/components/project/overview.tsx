import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import { IListHookProps, useList } from "isofw-shared/src/util/xpfwdata"
import { prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { ProjectForm, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NativeTable from "isofwrn/src/components/table"
import margins from "isofwrn/src/styles/margins"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { View } from "react-native"
import { Card } from "react-native-elements"

const Actions: React.FunctionComponent<any> = (props) => {
  if (props.isHeader) {return <View />}
  return (
    <View>
      <NativeButton
        title="directorr"
        iconRight={true}
        icon={{name: "info", color: "white"}}
        href={urls.directorPage}
        hrefParams={{id: get(props, "item._id")}}
      />
      <NativeButton
        title="programm"
        iconRight={true}
        icon={{name: "info", color: "white"}}
        href={urls.programPage}
        hrefParams={{id: get(props, "item._id")}}
      />
      <NativeButton
        title="Operatorr"
        iconRight={true}
        icon={{name: "info", color: "white"}}
        href={urls.operatorInfo}
        hrefParams={{id: get(props, "item._id")}}
      />
      <NativeButton
        title="edit"
        iconRight={true}
        icon={{name: "edit", color: "white"}}
        href={urls.edit}
        hrefParams={{
          collection: val.service.project,
          id: props.item._id
        }}
      />
    </View>
  )
}

const NativeProjectOverview: React.FunctionComponent<IListHookProps> = observer((props) => {
  const listHelper = useList(ProjectForm, undefined, props.prefix, props.options)
  return (
    <View style={{flex: 1}}>
      <SharedField schema={ProjectName} prefix={prependPrefix(ProjectForm.title, "projectOverview")} theme="search" />
      <Card containerStyle={{padding:  0}}>
        <NativeTable
          data={get(listHelper, "list.data", [])}
          rows={[String(ProjectName.title), Actions]}
          keyExtractor={(item) => item._id}
        />
        <NativeButton
          title="Create"
          icon={{name: "plus", type: "font-awesome", color: "white"}}
          iconRight={true}
          style={margins.top}
          href={`${urls.create}`}
          hrefParams={{collection: ProjectForm.collection}}
        />
      </Card>
    </View>
  )
})

export default NativeProjectOverview
