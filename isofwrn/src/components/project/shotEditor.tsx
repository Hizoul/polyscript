import sharedDirectorComponent, { DirectorComponentProps } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import { ProjectForm, ProjectName, ProjectShot, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NameDisplayer from "isofwrn/src/components/displayName"
import { get } from "lodash"
import * as React from "react"
import { Text, View } from "react-native"

const ShotEditor = (props: DirectorComponentProps) => {
  return (
    <View>
      <Text>
          {get(props, "original.result.name")}
      </Text>
      <View>
        <Text>{get(props, "original.result.shot")}</Text>
        <Text>CA&nbsp;</Text>
        <NameDisplayer
          collection={val.service.camera}
          id={get(props, `original.result.program[${get(props, "original.result.shot")}].${ShotCamera.mapTo}`)}
          getNameFrom={ProjectName.mapTo}
          placeholder=""
        />
      </View>
      <View style={{flexDirection: "row"}}>
        <NativeButton
          type={"outline"}
          title={"previous shot"}
          icon={{name: "step-backward", type: "font-awesome"}}
          onPress={props.decrease}
          loading={props.loading}
          disabled={props.loading}
        />
        <NativeButton
          title={"next shot"}
          icon={{name: "step-forward", type: "font-awesome"}}
          onPress={props.increase}
          loading={props.loading}
          disabled={props.loading}
        />
        <NativeButton
          type={"outline"}
          icon={{name: "home", type: "font-awesome"}}
          title={"placeholder"}
          loading={props.loading}
          disabled={props.loading}
        />
      </View>
    </View>
  )
}

export default sharedDirectorComponent(ShotEditor)
