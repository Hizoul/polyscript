import val from "isofw-shared/src/globals/val"
import { MailField } from "isofw-shared/src/util/xpfwdata"
import { OperatorRelation, ProjectCameras, ProjectName,
  ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"
import NativeNameDisplayer from "isofwrn/src/components/displayName"
import { get } from "lodash"
import * as React from "react"
import { Text, TouchableHighlight, View } from "react-native"
import { ListItem, Overlay } from "react-native-elements"

const CurrentOperatorDisplay: React.FunctionComponent<any> = (props) => {
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
            {props.currentCameras.map((camera: any) =>
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
          {get(props.item, String(ProjectOperatorCameraMapping.title), []).map((mapping: any) => {
            const cameras = mapping[String(ProjectCameras.title)]
            return (
              <ListItem
                key={mapping[String(OperatorRelation.title)]}
                onPress={props.changeOperator(mapping[String(OperatorRelation.title)])}
                leftElement={
                  <View>
                    <NativeNameDisplayer collection={val.service.user} id={mapping[String(OperatorRelation.title)]} getNameFrom={String(MailField.title)} />
                    <View style={{flexDirection: "row"}}>
                      <Text>Cameras </Text>
                      {cameras.map((camera: any) =>
                        <NativeNameDisplayer key={camera} collection={val.service.camera} id={camera} getNameFrom={String(ProjectName.title)} />)}
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
