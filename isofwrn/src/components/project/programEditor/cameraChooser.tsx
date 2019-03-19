import useCameraChooser from "isofw-shared/src/components/project/cameraChooser"
import val from "isofw-shared/src/globals/val"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NameDisplayer from "isofwrn/src/components/displayName"
import I18n from "isofwrn/src/components/i18n"
import * as React from "react"
import { View } from "react-native"
import { ListItem, Overlay } from "react-native-elements"

const NativeCameraMapping: React.FunctionComponent<IFieldProps> = (props) => {
  const chooserHelper = useCameraChooser(props.schema, props.mapTo, props.prefix)
  return (
    <View>
      <ListItem
        onPress={chooserHelper.showPop}
        rightIcon={{name: "camera", type: "font-awesome", color: "white"}}
        title={
          <View>
            <I18n text="operator.cameras.singularCamera" />
            <NameDisplayer collection={val.service.camera} id={chooserHelper.value} getNameFrom={String(ProjectName.title)} placeholder="not yet selected" />
          </View>
        }
      />
      <Overlay isVisible={chooserHelper.showPopUp} onBackdropPress={chooserHelper.hidePop}>
        <View>
            <I18n text="chooseCamera" />
            <NativeButton title="close" onPress={chooserHelper.hidePop} />
            {chooserHelper.cameras.map((camera: any) => (
                <ListItem
                  key={camera}
                  onPress={() => {
                    chooserHelper.hidePop()
                    chooserHelper.setValueWithPreset(camera)
                  }}
                  rightIcon={{name: "chevron"}}
                  title={<NameDisplayer collection={val.service.camera} id={camera} getNameFrom={String(ProjectName.title)} />}
                />
              ))}
        </View>
      </Overlay>
    </View>
  )
}

export default NativeCameraMapping
