import useDirector, { DirectorProps } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import { prependPrefix } from "isofw-shared/src/util/xpfwform"
import { DisabledCameras, ProjectForm, ProjectName, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NameDisplayer from "isofwrn/src/components/displayName"
import { textCenter } from "isofwrn/src/styles/text";
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text, View } from "react-native"
import NativeBenchmarkComponent from "../benchmark"
import I18n from "../i18n";
import NativeCameraDisabler from "./cameraDisabler"

const ShotEditor = observer((props: DirectorProps) => {
  const directorProps = useDirector(props.id)
  return (
    <View>
      <Text>
          {get(directorProps, "original.name")}
      </Text>
      <View>
        <Text>{get(directorProps, "original.shot")}</Text>
        <Text>CA&nbsp;</Text>
        <NameDisplayer
          collection={val.service.camera}
          id={get(directorProps, `original.program[${get(props, "original.result.shot")}].${ShotCamera.mapTo}`)}
          getNameFrom={String(ProjectName.title)}
          placeholder=""
        />
      </View>
      <View style={{flexDirection: "row"}}>
        <NativeButton
          type={"outline"}
          title={"shotEditor.previous"}
          icon={{name: "step-backward", type: "font-awesome"}}
          onPress={directorProps.decrease}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <NativeButton
          title={"shotEditor.next"}
          icon={{name: "step-forward", type: "font-awesome"}}
          onPress={directorProps.increase}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <NativeButton
          type={"outline"}
          icon={{name: "home", type: "font-awesome"}}
          title={"placeholder"}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
      </View>
      <I18n text="shotEditor.cameraControl" style={[textCenter, {fontSize: 30}]} />
      <NativeCameraDisabler schema={DisabledCameras} prefix={prependPrefix(ProjectForm.title, props.prefix)} autoSave={true} />
      {val.network.benchmarkEnabled ? <NativeBenchmarkComponent projectId={props.id} /> : undefined}
    </View>
  )
})

export default ShotEditor
