import useCameraMapping, { CameraMappingUtils } from "isofw-shared/src/components/project/cameraMapping"
import val from "isofw-shared/src/globals/val"
import { OperatorRelation, ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofwrn/src/components/displayName"
import { find, get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { Card, ListItem, Overlay } from "react-native-elements"
import { IFieldProps } from "../../../../isofw-shared/src/util/xpfwform"
import NativeButton from "../button"

const OperatorCamera: React.FunctionComponent<{
  operator: string
  mapper: CameraMappingUtils
}> = (props) => {
  return (
    <Card>
      <NameDisplayer collection={val.service.user} id={props.operator} getNameFrom={MailField.mapTo} />
        {props.mapper.cameras.map((camera) => {
          const operatorCameras = find(props.mapper.value, [OperatorRelation.title, props.operator])
          const selected = get(operatorCameras, String(ProjectCameras.title), []).indexOf(camera) !== -1
          return (
            <ListItem
              key={camera}
              onPress={props.mapper.changeMapping(props.operator, camera)}
              title={<NameDisplayer collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />}
              rightIcon={{
                name: selected ? "times" : "plus", type: "font-awesome",
                color: selected ? "red" : "green"
              }}
            />
          )
        })}
    </Card>
  )
}

const NativeCameraMapping: React.FunctionComponent<IFieldProps> = observer((props) => {
  const mapper = useCameraMapping(props.schema, props.mapTo, props.prefix)
  return (
    <View>
      <NativeButton
        onPress={mapper.showPop}
        title="operator to camera mapping"
        icon={{name: "camera", type: "font-awesome"}}
      />
      <Overlay isVisible={mapper.showPopUp === true} onBackdropPress={mapper.hidePop}>
        <ScrollView>
          <Text>select which operator handles which cameras</Text>
          {mapper.operators.map((operator) =>
            <OperatorCamera {...props} key={operator} operator={operator} mapper={mapper} />)}
        </ScrollView>
      </Overlay>
    </View>
  )
})

export default NativeCameraMapping
