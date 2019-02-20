import { IEditHookProps, useEditWithProps } from "isofw-shared/src/util/xpfwdata"
import { ComponentRegistry, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { FieldType } from "isofw-shared/src/util/xpfwvalidate"
import { ProjectForm, ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import { get } from "lodash"
import { observer } from "mobx-react-lite";
import * as React from "react"
import { Text, View } from "react-native"
import ProgramArray from "./array"
import WrappedCameraChooser from "./cameraChooser"
import PresetNumberDisplay from "./presetNumberDisplay"

const programTheme = "program"
ComponentRegistry.registerComponent(FieldType.Array, ProgramArray, programTheme)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, WrappedCameraChooser, programTheme)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, PresetNumberDisplay, ShotPreset.theme)

const ProgramEditor: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const editHelper = useEditWithProps(props)
  return (
    <View style={{flex: 1}}>
      <Text>
        {get(props, "original.result.name")}
      </Text>
      <SharedField
        schema={ProjectProgram}
        prefix={prependPrefix(ProjectForm.title, props.prefix)}
        theme={programTheme}
      />
      <NativeButton title="save" onPress={editHelper.submitEdit} loading={editHelper.loading} />
    </View>
  )
})

export default ProgramEditor
