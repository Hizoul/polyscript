import { directorPrefix } from "isofw-shared/src/components/project/directorSheet"
import { ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import NativePageContained from "isofwrn/src/components/pageContainer"
import ShotEditor from "isofwrn/src/components/project/shotEditor"
import * as React from "react"

const NativeDirectorPage: React.FunctionComponent<any> = (props) => {
  const id = props.navigation.getParam("id", "none")
  return (
    <NativePageContained {...props} title="director.title">
      <ShotEditor id={id} prefix="edit" />
    </NativePageContained>
  )
}

export default NativeDirectorPage
