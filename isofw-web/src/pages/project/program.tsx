import "isofw-web/src/components/form"
import { get } from "lodash"
import * as React from "react"
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project";
import WebPageContainer from "isofw-web/src/components/pageContainer";
import ProgramEditor from "isofw-web/src/components/project/programEditor";

const ProgramPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <WebPageContainer backLink requireLoggedIn={true} name="programEditor" title="Review presets">
      <ProgramEditor form={ProjectForm} id={id} resetState={true} prefix="programEdit" />
    </WebPageContainer>
  )
}

export default ProgramPage
