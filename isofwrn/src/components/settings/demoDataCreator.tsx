import { useDemoData } from "isofw-shared/src/util/createDemoData"
import i18n from "isofw-shared/src/util/i18n"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ActivityIndicator, View } from "react-native"
import { Card, Text } from "react-native-elements"
import NativeButton from "../button"

const NativeDemoDataCreator: React.FunctionComponent<any> = observer((props) => {
  const demoHelper = useDemoData()
  return (
    <Card
      title={i18n.t("demoDataHeader")}
    >
      <Text style={{textAlign: "center"}}>{i18n.t("demoDataProgress", [demoHelper.progress, demoHelper.total])}</Text>
      {demoHelper.loading ? <ActivityIndicator /> : null}
      <View style={{flexDirection: "row"}}>
        <NativeButton
          title="create"
          icon={{name: "plus", type: "font-awesome"}}
          onPress={demoHelper.createData}
        />
        <View style={{flex: 1}}/>
        <NativeButton
          title="remove"
          icon={{name: "trash", type: "font-awesome"}}
          onPress={demoHelper.removeDemoData}
        />
      </View>
    </Card>
  )
})

export default NativeDemoDataCreator
