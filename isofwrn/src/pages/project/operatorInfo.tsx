import { ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import navigatorRefHolder from "isofwrn/src/components/globalNavigator"
import NativePageContained from "isofwrn/src/components/pageContainer"
import NativeOperatorInfo from "isofwrn/src/components/project/operatorInfo"
import * as React from "react"

const NativeOperatorInfoPage: React.FunctionComponent<any> = (props) => {
  const id = props.navigation.getParam("id", "none")
  return (
    <NativePageContained {...props} title="Operator info">
      <NativeOperatorInfo form={ProjectForm} id={id} resetState={true} prefix="operatorInfo" />
    </NativePageContained>
  )
}

export default NativeOperatorInfoPage
