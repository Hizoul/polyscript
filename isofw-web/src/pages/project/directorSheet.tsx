import BenchmarkComponent from "isofw-web/src/components/benchmark"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import ShotEditor from "isofw-web/src/components/project/shotEditor"
import { get } from "lodash"
import * as React from "react"

const DirectorSheetPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <WebPageContainer backLink={true} requireLoggedIn={true} name="directorSheet" title="Director">
      <ShotEditor id={id} prefix="edit" />
      <BenchmarkComponent projectId={id} />
    </WebPageContainer>
  )
}

export default DirectorSheetPage
