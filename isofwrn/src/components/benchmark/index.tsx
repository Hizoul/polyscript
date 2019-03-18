import useBenchmark from "isofw-shared/src/network/benchmarkHook"
import i18n from "isofw-shared/src/util/i18n"
import { textCenter } from "isofwrn/src/styles/text"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text } from "react-native"
import { Card } from "react-native-elements"
import NativeButton from "../button"
import TranslatedText from "../i18n"

const NativeBenchmarkComponent: React.FunctionComponent<{projectId: string}> = observer((props) => {
  const benchmarkResults = useBenchmark(props.projectId)
  return (
    <Card
      title={i18n.t("benchmarkHeader")}
    >
      <TranslatedText
        style={textCenter}
        text={"benchmarkProgress"}
        textParams={[benchmarkResults.currentlyAt, benchmarkResults.total]}
      />
      <NativeButton
        title="benchmarkStart"
        onPress={benchmarkResults.causeProjectTraffic}
        disabled={benchmarkResults.loading}
      />
    </Card>
  )
})

export default NativeBenchmarkComponent
