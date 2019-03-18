import useCameraDisabler from "isofw-shared/src/components/project/cameraDisabler"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { OperatorRelation, ProjectCameras } from "isofw-shared/src/xpfwDefs/project"
import { colorError, colorSuccess } from "isofwrn/src/styles/color"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ScrollView, View } from "react-native"
import { Card, ListItem } from "react-native-elements"
import { CameraNameDisplayer, UserNameDisplayer } from "../displayName"

const Dot: React.FunctionComponent<{isGreen?: boolean}>  = (props) => {
  return (
    <View
      style={{
        width: 20, height: 20, borderRadius: 99999,
        backgroundColor: props.isGreen ? colorSuccess : colorError
      }}
    />
  )
}

const NativeCameraDisabler: React.FunctionComponent<IFieldProps & {autoSave?: boolean}> = observer((props) => {
  const disableHelper = useCameraDisabler(props.schema, props.mapTo, props.prefix, props.autoSave)
  return (
    <ScrollView
      contentContainerStyle={{alignItems: "center"}}
      style={{flexDirection: "row"}}
      horizontal={true}
    >
      {disableHelper.operatorCameraMapping.map((item) => {
        const operatorId = get(item, String(OperatorRelation.title))
        const cameras = get(item, String(ProjectCameras.title), [])
        return (
          <Card
            key={operatorId}
            containerStyle={{
              padding: 0, borderRadius: 25, overflow: "hidden",
              minWidth: 250, minHeight: 50
            }}
          >
              <ListItem
                onPress={disableHelper.operatorToggles[operatorId]}
                title={<UserNameDisplayer id={operatorId} />}
                bottomDivider={true}
                rightIcon={<Dot isGreen={disableHelper.isActive[operatorId] === true} />}
              />
              {cameras.map((cameraId: any, index: number) => (
                <ListItem
                  key={cameraId}
                  onPress={disableHelper.cameraToggles[cameraId]}
                  topDivider={true}
                  bottomDivider={index < (cameras.length - 1)}
                  title={<CameraNameDisplayer id={cameraId} />}
                  rightIcon={<Dot isGreen={disableHelper.isActive[cameraId] === true} />}
                />
              ))}
          </Card>
        )
      })}
    </ScrollView>
  )
})

export default NativeCameraDisabler
