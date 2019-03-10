import { BlockTitle, Card, CardContent, CardFooter, CardHeader } from "framework7-react"
import useBenchmark from "isofw-shared/src/network/benchmarkHook"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebButton from "../button"

const BenchmarkComponent: React.FunctionComponent<{projectId: string}> = observer((props) => {
  const benchmarkResults = useBenchmark(props.projectId)
  return (
    <Card>
      <CardHeader>Benchmarking interface</CardHeader>
      <CardContent>
        <div>
          {benchmarkResults.currentlyAt} / {benchmarkResults.total}
        </div>
        <div>
          uploaded is {JSON.stringify(benchmarkResults.uploaded)}
        </div>
      </CardContent>
      <CardFooter>
        <WebButton text=" start Project traffic test " onClick={benchmarkResults.causeProjectTraffic} />
      </CardFooter>
    </Card>
  )
})

export default BenchmarkComponent
