import useDirector, { DirectorProps } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import { ProjectName, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import NativeButton from "isofwrn/src/components/button"
import NameDisplayer from "isofwrn/src/components/displayName"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text, View } from "react-native"

const ShotEditor = observer((props: DirectorProps) => {
  const directorProps = useDirector(props.id, props.reset)
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
          title={"previous shot"}
          icon={{name: "step-backward", type: "font-awesome"}}
          onPress={directorProps.decrease}
          loading={directorProps.loading}
          disabled={directorProps.loading}
        />
        <NativeButton
          title={"next shot"}
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
    </View>
  )
})

export default ShotEditor
