import useDirector, { DirectorProps } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import { prependPrefix } from "isofw-shared/src/util/xpfwform"
import { DisabledCameras, ProjectForm, ProjectName, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NameDisplayer from "isofwrn/src/components/displayName"
import baseStyles from "isofwrn/src/styles/base"
import margins from "isofwrn/src/styles/margins"
import { textCenter } from "isofwrn/src/styles/text"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ScrollView, StyleSheet, Text, View } from "react-native"
import NativeBenchmarkComponent from "../benchmark"
import I18n from "../i18n"
import NativeCameraDisabler from "./cameraDisabler"

const styles = StyleSheet.create({
  box: {
    backgroundColor: "grey",
    borderRadius: 30,
    padding: 15,
    alignItems: "center"
  },
  currentShot: {
    fontSize: 70
  },
  cameraText: {
    fontSize: 30
  },
  top: {
    flexDirection: "row",
    alignItems: "center"
  }
})

const ShotEditor = observer((props: DirectorProps) => {
  const directorProps = useDirector(props.id)
  return (
    <ScrollView>
      <View style={styles.top}>
        <I18n text="director.project" />
        <Text>
          {get(directorProps, "original.name")}
        </Text>
      </View>
      <View style={baseStyles.row}>
        <View style={baseStyles.flex1} />
        <View style={styles.box}>
          <Text style={styles.currentShot}>{get(directorProps, "original.shot")}</Text>
          <View style={baseStyles.row}>
            <Text style={styles.cameraText}>CA&nbsp;</Text>
            <NameDisplayer
              collection={val.service.camera}
              id={get(directorProps, `original.program[${get(props, "original.result.shot")}].${ShotCamera.mapTo}`)}
              getNameFrom={String(ProjectName.title)}
              placeholder=""
              style={styles.cameraText}
            />
          </View>
        </View>
        <View style={baseStyles.flex1} />
      </View>
      <View
        style={[baseStyles.row, baseStyles.justifyCenter, margins.topBot]}
      >
        <NativeButton
          type={"outline"}
          title={"director.previous"}
          icon={{name: "step-backward", type: "font-awesome", size: 70, color: "#2089dc"}}
          onPress={directorProps.decrease}
          loading={directorProps.loading}
          disabled={directorProps.loading}
          titleStyle={{fontSize: 70}}
          buttonStyle={{marginRight: 20}}
        />
        <NativeButton
          title={"director.next"}
          icon={{name: "step-forward", type: "font-awesome", color: "white", size: 70}}
          onPress={directorProps.increase}
          loading={directorProps.loading}
          disabled={directorProps.loading}
          titleStyle={{fontSize: 70}}
        />
      </View>
      <I18n text="director.cameras" style={[textCenter, {fontSize: 30}]} />
      <NativeCameraDisabler schema={DisabledCameras} prefix={prependPrefix(ProjectForm.title, props.prefix)} autoSave={true} />
      {val.network.benchmarkEnabled ? <NativeBenchmarkComponent projectId={props.id} /> : undefined}
    </ScrollView>
  )
})

export default ShotEditor
