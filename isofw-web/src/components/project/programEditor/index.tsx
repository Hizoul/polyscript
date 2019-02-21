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
  console.log("IN program editor with EDITOR WITH", toJS(editHelper))
  return (
    <div className="flex1 column">
      <div className="flex center">
        <div className="titleBox">
          {get(editHelper, "original.name")}
        </div>
      </div>
      <SharedField schema={ProjectProgram} prefix={prependPrefix(ProjectForm.title, props.prefix)} theme={programTheme} />
      <WebButton text="save" onClick={editHelper.submitEdit} loading={editHelper.loading} />
    </div>
  )
})

export default ProgramEditor
