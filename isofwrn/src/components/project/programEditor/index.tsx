import { ComponentRegistry, SharedField } from "isofw-shared/src/util/xpfwformshared"
import { IFormEditProps, SharedFormEdit } from "isofw-shared/src/util/xpfwuishared"
import { FieldType } from "isofw-shared/src/util/xpfwvalidate"
import { ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button";
import { get } from "lodash"
import * as React from "react"
import { Text, View } from "react-native"
import ProgramArray from "./array"
import WrappedCameraChooser from "./cameraChooser"
import PresetNumberDisplay from "./presetNumberDisplay"

const programTheme = "program"
ComponentRegistry.registerComponent(FieldType.Array, ProgramArray, programTheme)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, WrappedCameraChooser, programTheme)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, PresetNumberDisplay, ShotPreset.theme)

const ProgramEditor: React.FunctionComponent<IFormEditProps> = (props) => {
  return (
    <View style={{flex: 1}}>
      <Text>
        {get(props, "original.result.name")}
      </Text>
      <SharedField field={ProjectProgram} prefix={props.prefix} theme={programTheme} />
      <NativeButton title="save" onPress={props.submitEdit} loading={props.loading} />
    </View>
  )
}

export default SharedFormEdit<{}>(ProgramEditor)
