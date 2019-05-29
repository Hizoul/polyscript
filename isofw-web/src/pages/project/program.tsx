import { ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import "isofw-web/src/components/form"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import ProgramEditor from "isofw-web/src/components/project/programEditor"
import ProgramSaveButton from "isofw-web/src/components/project/programEditor/topRightSaveButton"
import { get } from "lodash"
import * as React from "react"

const ProgramPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <WebPageContainer
      backLink={true}
      requireLoggedIn={true}
      name="programEditor"
      title="Review presets"
      rightContent={<ProgramSaveButton schema={ProjectForm} id={id} prefix="edit" />}
    >
      <ProgramEditor schema={ProjectForm} id={id} prefix="edit" />
    </WebPageContainer>
  )
}

export default ProgramPage
