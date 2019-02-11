import SharedOperatorInfo, {
  SharedOperatorInfoProps
} from "isofw-shared/src/components/project/operatorInfo"
import val from "isofw-shared/src/globals/val"
import { DbStore, IFormEditProps, IFormShowProps, SharedFormEdit } from "isofw-shared/src/util/xpfwuishared"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import {
  ProjectName, ProjectShot, ShotCamera, ShotDuration, ShotImportance,
  ShotMovement, ShotMovementTowards, ShotName, ShotPreset, ShotRemarksDirector, ShotType
} from "isofw-shared/src/xpfwDefs/project"
import NativeNameDisplayer from "isofwrn/src/components/displayName"
import CurrentOperatorDisplay from "isofwrn/src/components/project/operatorInfoOperatorChooser"
import NativeTable from "isofwrn/src/components/table"
import { get } from "lodash"
import * as React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Card, Overlay } from "react-native-elements"

const CamName: React.FunctionComponent<any> = (props) => {
  if (props.isHeader) {return <Text>Camera</Text>}
  return (
    <NativeNameDisplayer
      collection={val.service.camera}
      id={get(props.item, ShotCamera.mapTo)}
      getNameFrom={ProjectName.mapTo}
      placeholder=""
    />
  )
}
const PresetName: React.FunctionComponent<any> = (props) => {
  if (props.isHeader) {return <Text>Preset</Text>}
  return (
    <NativeNameDisplayer
      collection={val.service.preset}
      id={get(props.item, ShotPreset.mapTo)}
      getNameFrom={PresetNumberField.mapTo}
      placeholder=""
    />
  )
}
const PresetNumber: React.FunctionComponent <any> = (props) => {
  if (props.isHeader) {return <Text>#</Text>}
  return <Text>{props.index}</Text>
}

const TopBarStyle = StyleSheet.create({
  box: {
    flex: 1,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: "#c4c4c4"
  },
  middleBox: {
    marginRight: 20, marginLeft: 20, alignItems: "center"
  },
  rightBox: {
    alignContent: "flex-end",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  title: {
    fontSize: 24
  }
})

class OperatorInfo extends React.Component<IFormEditProps & SharedOperatorInfoProps> {
  private previousPosition: number = 0
  private scrollViewRef: any = undefined
  public componentDidUpdate() {
    if (this.scrollViewRef != null) {
      const newPosition = get(this.props, "original.result." + ProjectShot.mapTo)
      if (newPosition !== this.previousPosition) {
        this.previousPosition = newPosition
        if (this.scrollViewRef != null) {
          this.scrollViewRef.scrollToOffset({
            offset: newPosition * 33
          })
        }
      }
    }
  }
  public render() {
    const props = this.props
    let i = 0
    const content = props.isPresetView ? null : (
      <Card containerStyle={{maxHeight: 250}}>
        <NativeTable
          data={props.filteredList}
          keyExtractor={(item) => String(++i)}
          rows={[
            PresetNumber, CamName, PresetName, ShotImportance.mapTo,
            ShotName.mapTo, ShotType.mapTo, ShotMovement.mapTo, ShotMovementTowards.mapTo,
            ShotDuration.mapTo, ShotRemarksDirector.mapTo
          ]}
          refGetter={(newRef: any) => this.scrollViewRef = newRef}
        />
      </Card>
    )
    return (
      <View>
        <View style={{flexDirection: "row"}}>
          <View style={TopBarStyle.box}>
            <Text>Current project</Text>
            <Text style={TopBarStyle.title}>{get(props, "original.result.name")}</Text>
          </View>
          <View style={[TopBarStyle.box, TopBarStyle.middleBox]}>
            <CurrentOperatorDisplay {...props} />
          </View>
          <View style={[TopBarStyle.box, TopBarStyle.rightBox]}>
            <Text>Current Preset</Text>
            {props.currentPreset ? (
                <View style={{flexDirection: "row"}}>
                  <NativeNameDisplayer
                    collection={val.service.camera}
                    id={get(props.currentPreset, ShotCamera.mapTo)}
                    getNameFrom={ProjectName.mapTo}
                    placeholder=""
                    style={TopBarStyle.title}
                  />
                  <Text style={TopBarStyle.title}>&nbsp;{get(props.currentPreset, ShotName.mapTo, "")}</Text>
                </View>
              ) : null}
          </View>
        </View>
        {content}
        {props.loading ? <View /> : null}
      </View>
    )
  }
}
const c: any = OperatorInfo
const b: any = SharedOperatorInfo(c)
export default SharedFormEdit<any>(b)
