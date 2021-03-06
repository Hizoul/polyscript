import useOperatorInfo from "isofw-shared/src/components/project/operatorInfo"
import val from "isofw-shared/src/globals/val"
import { IEditHookProps } from "isofw-shared/src/util/xpfwdata"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import {
  ProjectName, ProjectShot, ShotCamera, ShotDuration, ShotImportance,
  ShotMovement, ShotMovementTowards, ShotName, ShotNumber, ShotPreset, ShotRemarksDirector, ShotType
} from "isofw-shared/src/xpfwDefs/project"
import NativeNameDisplayer from "isofwrn/src/components/displayName"
import CurrentOperatorDisplay from "isofwrn/src/components/project/operatorInfoOperatorChooser"
import NativeTable from "isofwrn/src/components/table"
import { findIndex, get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Card, Overlay } from "react-native-elements"

const CamName: React.FunctionComponent<any> = (props) => {
  if (props.isHeader) {return <Text>Camera</Text>}
  return (
    <NativeNameDisplayer
      collection={val.service.camera}
      id={get(props.item, String(ShotCamera.title))}
      getNameFrom={String(ProjectName.title)}
      placeholder=""
    />
  )
}
const PresetName: React.FunctionComponent<any> = (props) => {
  if (props.isHeader) {return <Text>Preset</Text>}
  return (
    <NativeNameDisplayer
      collection={val.service.preset}
      id={get(props.item, String(ShotPreset.title))}
      getNameFrom={String(PresetNumberField.title)}
      placeholder=""
    />
  )
}
const PresetNumber: React.FunctionComponent <any> = (props) => {
  if (props.isHeader) {return <Text>#</Text>}
  return <Text>{get(props.item, ShotNumber.title, -1)}</Text>
}

const TopBarStyle = StyleSheet.create({
  box: {
    flex: 1,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#c4c4c4",
    paddingLeft: 5,
    paddingRight: 5
  },
  middleBox: {
    marginRight: 20, marginLeft: 20, alignItems: "center"
  },
  rightBox: {
  },
  title: {
    fontSize: 24
  }
})

const OperatorInfo: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const scrollViewRef: any = React.useRef(undefined)
  const previousPosition = React.useState(0)
  const operatorHelper = useOperatorInfo(props.id, props.mapTo, props.prefix)
  React.useEffect(() => {
    if (scrollViewRef != null && scrollViewRef.current != null) {
      const currentShot = operatorHelper.currentShot
      const newPosition = findIndex(operatorHelper.filteredList, [String(ShotNumber.title), currentShot])
      if (newPosition !== previousPosition[0]) {
        previousPosition[1](newPosition)
        scrollViewRef.current.scrollToOffset({
          offset: newPosition * 36
        })
      }
    }
  })

  let i = 0
  const content = operatorHelper.isPresetView ? null : (
    <Card containerStyle={{flex: 1, marginBottom: 5}}>
      <NativeTable
        data={operatorHelper.filteredList}
        keyExtractor={(item) => String(++i)}
        currentEntry={operatorHelper.currentShot}
        rows={[
          PresetNumber, CamName, PresetName, String(ShotImportance.title),
          String(ShotName.title), String(ShotType.title), String(ShotMovement.title),
          String(ShotMovementTowards.title), String(ShotDuration.title), String(ShotRemarksDirector.title)
        ]}
        refGetter={scrollViewRef}
      />
    </Card>
  )
  return (
    <View style={{flex: 1}}>
      <View style={{flexDirection: "row"}}>
        <View style={TopBarStyle.box}>
          <Text>Current project</Text>
          <Text style={TopBarStyle.title}>{get(operatorHelper, "original.name")}</Text>
        </View>
        <View style={[TopBarStyle.box, TopBarStyle.middleBox]}>
          <CurrentOperatorDisplay {...props} {...operatorHelper} />
        </View>
        <View style={[TopBarStyle.box, TopBarStyle.rightBox]}>
          <Text>Current Preset</Text>
          {operatorHelper.currentPreset ? (
              <View style={{flexDirection: "row"}}>
                <NativeNameDisplayer
                  collection={val.service.camera}
                  id={get(operatorHelper.currentPreset, String(ShotCamera.title))}
                  getNameFrom={String(ProjectName.title)}
                  placeholder=""
                  style={TopBarStyle.title}
                />
                <Text style={TopBarStyle.title}>&nbsp;{get(operatorHelper.currentPreset, String(ShotName.title), "")}</Text>
              </View>
            ) : null}
        </View>
      </View>
      {content}
      {operatorHelper.loading ? <View /> : null}
    </View>
  )
})

export default OperatorInfo
