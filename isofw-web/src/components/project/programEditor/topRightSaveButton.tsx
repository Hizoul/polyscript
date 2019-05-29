import { IEditHookProps, useEditWithProps } from "@xpfw/data"
import WebButton from "isofw-web/src/components/button"
import { observer } from "mobx-react-lite"
import * as React from "react"

const ProgramSaveButton: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const editHelper = useEditWithProps(props)
  return (
    <>
      <WebButton
        text=""
        iconFa="save"
        onClick={editHelper.submitEdit}
        loading={editHelper.loading}
      />
    </>
  )
})

export default ProgramSaveButton
