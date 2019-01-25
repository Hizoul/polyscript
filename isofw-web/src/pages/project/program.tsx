import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project";
import "isofw-web/src/components/form"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import ProgramEditor from "isofw-web/src/components/project/programEditor";
import { get } from "lodash"
import * as React from "react"

const ProgramPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <WebPageContainer backLink={true} requireLoggedIn={true} name="programEditor" title="Review presets">
      <ProgramEditor form={ProjectForm} id={id} resetState={true} prefix="programEdit" />
    </WebPageContainer>
  )
}

export default ProgramPage
