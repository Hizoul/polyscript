import useCameraMapping, { CameraMappingUtils } from "isofw-shared/src/components/project/cameraMapping"
import val from "isofw-shared/src/globals/val"
import { OperatorRelation, ProjectCameras, ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofwrn/src/components/displayName"
import { find, get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { Card, ListItem, Overlay } from "react-native-elements"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { MailField } from "isofw-shared/src/util/xpfwdata"
import NativeButton from "../button"
import i18n from "isofw-shared/src/util/i18n"

const OperatorCamera: React.FunctionComponent<{
  operator: string
  mapper: CameraMappingUtils
}> = (props) => {
  return (
    <Card>
      <NameDisplayer collection={val.service.user} id={props.operator} getNameFrom={MailField.title} />
        {props.mapper.cameras.map((camera) => {
          const operatorCameras = find(props.mapper.value, [OperatorRelation.title, props.operator])
          const selected = get(operatorCameras, String(ProjectCameras.title), []).indexOf(camera) !== -1
          return (
            <ListItem
              key={camera}
              onPress={props.mapper.changeMapping(props.operator, camera)}
              title={<NameDisplayer collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />}
              rightIcon={{
                name: selected ? "times" : "plus", type: "font-awesome", color: "white",
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
        title="operatorToCamera"
        icon={{name: "camera", type: "font-awesome", color: "white"}}
      />
      <Overlay isVisible={mapper.showPopUp === true} onBackdropPress={mapper.hidePop}>
        <ScrollView>
          <Text>{i18n.t("operatorToCamera")}</Text>
          {mapper.operators.map((operator) =>
            <OperatorCamera {...props} key={operator} operator={operator} mapper={mapper} />)}
        </ScrollView>
      </Overlay>
    </View>
  )
})

export default NativeCameraMapping
