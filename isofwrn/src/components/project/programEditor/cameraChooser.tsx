import useCameraChooser from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import { IFieldProps } from "isofw-shared/src/util/xpfwform";
import { OperatorRelation, ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import NameDisplayer from "isofwrn/src/components/displayName"
import { find, get } from "lodash"
import * as React from "react"
import { Text, View } from "react-native"
import { ListItem, Overlay } from "react-native-elements"

const NativeCameraMapping: React.FunctionComponent<IFieldProps> = (props) => {
  const chooserHelper = useCameraChooser(props.schema, props.mapTo, props.prefix)
  return (
    <View>
      <ListItem
        onPress={chooserHelper.showPop}
        rightIcon={{name: "camera", type: "font-awesome"}}
        title={
          <View>
            <Text>Camera:&nbsp;</Text>
            <NameDisplayer collection={val.service.camera} id={chooserHelper.value} getNameFrom={ProjectName.mapTo} placeholder="not yet selected" />
          </View>}
      />
      <Overlay isVisible={chooserHelper.showPopUp} onBackdropPress={chooserHelper.hidePop}>
        <View>
          <Text>Choose a camera {props.schema.title}</Text>
            {chooserHelper.cameras.map((camera: any) => (
                <ListItem
                  key={camera}
                  onPress={() => {
                    chooserHelper.hidePop()
                    chooserHelper.setValueWithPreset(camera)
                  }}
                  rightIcon={{name: "chevron"}}
                  title={<NameDisplayer collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />}
                />
              ))}
        </View>
      </Overlay>
    </View>
  )
}

export default NativeCameraMapping
