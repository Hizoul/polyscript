import { BlockTitle, Card, CardContent, CardFooter, CardHeader, List, ListInput, Progressbar } from "framework7-react"
import useBenchmark from "isofw-shared/src/network/benchmarkHook"
import BenchmarkStore from "isofw-shared/src/network/benchmarkStore"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebButton from "../button"
import I18n from "../i18n"

const BenchmarkComponent: React.FunctionComponent<{projectId: string}> = observer((props) => {
  const benchmarkResults = useBenchmark(props.projectId)
  return (
    <Card>
      <CardHeader><I18n text="benchmark.header" /></CardHeader>
      <CardContent>
        <List>
          <ListInput
            label="Program Size"
            value={benchmarkResults.programSize}
            type="number"
            onChange={(event) => {
              BenchmarkStore.programSize = Number(event.nativeEvent.target.value)
            }}
          />
        </List>
        <div className="text-align-center">
          <I18n
            text="benchmark.progress"
            textParams={[benchmarkResults.currentlyAt, benchmarkResults.total]}
          />
        </div>
        <Progressbar progress={Math.round(benchmarkResults.currentlyAt / benchmarkResults.total) * 100} />
      </CardContent>
      <CardFooter>
        <WebButton text="benchmark.start" onClick={benchmarkResults.causeProjectTraffic} />
        <WebButton
          text="benchmark.parallel"
          textParams={[benchmarkResults.isParallel]}
          onClick={benchmarkResults.toggleParallel}
        />
        <WebButton
          text="benchmark.onlyDiff"
          textParams={[benchmarkResults.isPatchDiff]}
          onClick={benchmarkResults.togglePatchDiff}
        />
      </CardFooter>
    </Card>
  )
})

export default BenchmarkComponent
