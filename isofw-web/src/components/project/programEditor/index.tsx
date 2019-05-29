import { IEditHookProps, toJS, useEditWithProps } from "@xpfw/data"
import { prependPrefix, SharedField } from "@xpfw/form"
import { ProjectForm, ProjectProgram } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const programTheme = "program"

const ProgramEditor: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const editHelper = useEditWithProps(props)
  return (
    <div className="flex1 column">
      <div className="flex center" style={{marginTop: "0.4rem", marginBottom: "1.5rem"}}>
        <div className="titleBox">
          {get(editHelper, "original.name")}
        </div>
      </div>
      <SharedField schema={ProjectProgram} prefix={prependPrefix(ProjectForm.title, props.prefix)} theme={programTheme} />
    </div>
  )
})

export default ProgramEditor
