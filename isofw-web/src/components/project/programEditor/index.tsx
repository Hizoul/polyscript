import { IEditHookProps, useEditWithProps } from "@xpfw/data"
import { ComponentRegistry, FormStore, prependPrefix, SharedField } from "@xpfw/form"
import { ProjectForm, ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import WebButton from "isofw-web/src/components/button"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const programTheme = "program"

const ProgramEditor: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const editHelper = useEditWithProps(props)
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
