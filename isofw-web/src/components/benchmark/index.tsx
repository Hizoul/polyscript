import { BlockTitle, Card, CardContent, CardFooter, CardHeader, Progressbar } from "framework7-react"
import useBenchmark from "isofw-shared/src/network/benchmarkHook"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebButton from "../button"
import I18n from "../i18n"

const BenchmarkComponent: React.FunctionComponent<{projectId: string}> = observer((props) => {
  const benchmarkResults = useBenchmark(props.projectId)
  return (
    <Card>
      <CardHeader><I18n text="benchmarkHeader" /></CardHeader>
      <CardContent>
        <div className="text-align-center">
          <I18n
            text="benchmarkProgress"
            textParams={[benchmarkResults.currentlyAt, benchmarkResults.total]}
          />
        </div>
        <Progressbar progress={Math.round(benchmarkResults.currentlyAt / benchmarkResults.total) * 100} />
      </CardContent>
      <CardFooter>
        <WebButton text="benchmarkStart" onClick={benchmarkResults.causeProjectTraffic} />
      </CardFooter>
    </Card>
  )
})

export default BenchmarkComponent
