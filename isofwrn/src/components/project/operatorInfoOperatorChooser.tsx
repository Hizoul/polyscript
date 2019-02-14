import SharedOperatorInfo, { SharedOperatorInfoProps } from "isofw-shared/src/components/project/operatorInfo"
import val from "isofw-shared/src/globals/val"
import { MailField } from "isofw-shared/src/util/xpfwuishared"
import { OperatorRelation, ProjectCameras, ProjectName,
  ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"
import NativeNameDisplayer from "isofwrn/src/components/displayName"
import NativeLink from "isofwrn/src/components/link"
import { get } from "lodash"
import * as React from "react"
import { Text, TouchableHighlight, View } from "react-native"
import { ListItem, Overlay } from "react-native-elements"

const CurrentOperatorDisplay: React.FunctionComponent<SharedOperatorInfoProps> = (props) => {
  const name = props.currentOperator && props.currentOperator.length > 0 ?
  <NativeNameDisplayer collection={val.service.user} id={props.currentOperator} getNameFrom={MailField.mapTo} /> : <Text>All</Text>
  return (
    <View>
      <TouchableHighlight onPress={props.showOperatorChooser}>
      <View>
        <View>{name}</View>
        {props.currentCameras && props.currentCameras.length > 0 ? (
          <View>
            <Text>CA</Text>
            {props.currentCameras.map((camera) =>
            <NativeNameDisplayer key={camera} collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />)}
          </View>
        ) : <Text>Showing all cameras</Text>}
        </View>
      </TouchableHighlight>
      <Overlay isVisible={props.isOperatorChooserVisible} onBackdropPress={props.hideOperatorChooser}>
        <View>
          <ListItem
            onPress={props.changeOperator("")}
            title="No one"
            subtitle="All cameras"
          />
          {get(props.item, ProjectOperatorCameraMapping.mapTo, []).map((mapping: any) => {
            const cameras = mapping[ProjectCameras.mapTo]
            return (
              <ListItem
                key={mapping[OperatorRelation.mapTo]}
                onPress={props.changeOperator(mapping[OperatorRelation.mapTo])}
                leftElement={
                  <View>
                    <NativeNameDisplayer collection={val.service.user} id={mapping[OperatorRelation.mapTo]} getNameFrom={MailField.mapTo} />
                    <View style={{flexDirection: "row"}}>
                      <Text>Cameras </Text>
                      {cameras.map((camera: any) =>
                        <NativeNameDisplayer key={camera} collection={val.service.camera} id={camera} getNameFrom={ProjectName.mapTo} />)}
                    </View>
                  </View>
                }
              />
          )})}
        </View>
      </Overlay>
    </View>
  )
}

export default CurrentOperatorDisplay
