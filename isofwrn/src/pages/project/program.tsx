import { directorPrefix } from "isofw-shared/src/components/project/directorSheet"
import { ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import NativePageContained from "isofwrn/src/components/pageContainer"
import NativeProgramEditor from "isofwrn/src/components/project/programEditor"
import * as React from "react"

const NativeProgramPage: React.FunctionComponent<any> = (props) => {
  const id = props.navigation.getParam("id", "none")
  return (
    <NativePageContained {...props} title="director">
      <NativeProgramEditor form={ProjectForm} id={id} resetState={true} prefix={"program"} />
    </NativePageContained>
  )
}

export default NativeProgramPage
