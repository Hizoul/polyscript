import useBenchmark from "isofw-shared/src/network/benchmarkHook"
import i18n from "isofw-shared/src/util/i18n"
import baseStyles from "isofwrn/src/styles/base"
import { textCenter } from "isofwrn/src/styles/text"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text, View } from "react-native"
import { Card, Input } from "react-native-elements"
import NativeButton from "../button"
import TranslatedText from "../i18n"

const NativeBenchmarkComponent: React.FunctionComponent<{projectId: string}> = observer((props) => {
  const benchmarkResults = useBenchmark(props.projectId)
  return (
    <Card
      title={i18n.t("benchmark.header")}
    >
      <Input
        label="Program Size"
        value={String(benchmarkResults.programSize)}
        keyboardType="number-pad"
        onChangeText={(value) => benchmarkResults.programSize = Number(value)}
      />
      <TranslatedText
        style={textCenter}
        text={"benchmark.progress"}
        textParams={[benchmarkResults.currentlyAt, benchmarkResults.total]}
      />
      <View style={baseStyles.row}>
        <NativeButton
          title="benchmark.start"
          onPress={benchmarkResults.causeProjectTraffic}
          disabled={benchmarkResults.loading}
        />
        <NativeButton
          title="benchmark.parallel"
          titleParams={[benchmarkResults.isParallel]}
          onPress={benchmarkResults.toggleParallel}
        />
        <NativeButton
          title="benchmark.onlyDiff"
          titleParams={[benchmarkResults.isPatchDiff]}
          onPress={benchmarkResults.togglePatchDiff}
        />
      </View>
    </Card>
  )
})

export default NativeBenchmarkComponent
