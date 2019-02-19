import SharedCameraChoice, { SharedCameraChoiceProps } from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import { MailField } from "isofw-shared/src/util/xpfwuishared"
import { OperatorRelation, ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofwrn/src/components/displayName"
import { find, get } from "lodash"
import * as React from "react"
import { Text, View } from "react-native"
import { ListItem, Overlay } from "react-native-elements"

const nativeCameraMapping: React.FunctionComponent<SharedCameraChoiceProps> = (props) => {
  return (
    <View>
      <ListItem
        onPress={props.togglePop}
        rightIcon={{name: "camera", type: "font-awesome"}}
        title={
          <View>
            <Text>Camera:&nbsp;</Text>
            <NameDisplayer collection={val.service.camera} id={props.value} getNameFrom={ProjectName.mapTo} placeholder="not yet selected" />
          </View>}
      />
      <Overlay isVisible={props.showPopUp === true} onBackdropPress={props.togglePop}>
        <View>
          <Text>Choose a camera {props.field.mapTo}</Text>
            {props.cameras ? props.cameras.map((camera) => (
                <ListItem
                  key={camera}
                  onPress={() => {
                    props.togglePop(false)
                    props.setValueWithPreset(camera)
                  }}
                  rightIcon={{name: "chevron"}}
                  title={<NameDisplayer collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />}
                />
              )) : undefined}
        </View>
      </Overlay>
    </View>
  )
}

const WrappedCameraChooser = SharedCameraChoice(nativeCameraMapping)
export default WrappedCameraChooser
