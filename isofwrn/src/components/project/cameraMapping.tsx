import SharedCameraMapping, { SharedCameraMappingProps } from "isofw-shared/src/components/project/cameraMapping"
import val from "isofw-shared/src/globals/val"
import { MailField } from "isofw-shared/src/util/xpfwuishared"
import { OperatorRelation, ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofwrn/src/components/displayName"
import { find, get } from "lodash"
import * as React from "react"
import { Text, View, ScrollView } from "react-native"
import { Card, ListItem, Overlay } from "react-native-elements"
import NativeButton from "../button"

const OperatorCamera: React.FunctionComponent<SharedCameraMappingProps & {operator: string}> = (props) => {
  return (
    <Card>
      <NameDisplayer collection={val.service.user} id={props.operator} getNameFrom={MailField.mapTo} />

        {props.cameras.map((camera) => {
          const operatorCameras = find(props.value, [OperatorRelation.mapTo, props.operator])
          const selected = get(operatorCameras, ProjectCameras.mapTo, []).indexOf(camera) !== -1
          return (
            <ListItem
              key={camera}
              onPress={props.changeMapping(props.operator, camera)}
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

const nativeCameraMapping: React.FunctionComponent<SharedCameraMappingProps> = (props) => {
  return (
    <View>
      <NativeButton
        onPress={props.togglePop}
        title="operator to camera mapping"
        icon={{name: "camera", type: "font-awesome"}}
      />
      <Overlay isVisible={props.showPopUp === true} onBackdropPress={props.togglePop}>
        <ScrollView>
          <Text>select which operator handles which cameras</Text>
          {props.operators.map((operator) => <OperatorCamera {...props} key={operator} operator={operator} />)}
        </ScrollView>
      </Overlay>
    </View>
  )
}

const NativeCameraMapping = SharedCameraMapping(nativeCameraMapping)
export default NativeCameraMapping
