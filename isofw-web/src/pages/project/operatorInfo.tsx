import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import "isofw-web/src/components/form"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import OperatorInfo from "isofw-web/src/components/project/operatorInfo"
import { get } from "lodash"
import * as React from "react"

const OperatorInfoPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <WebPageContainer backLink={true} requireLoggedIn={true} name="operatorInfo" title="Operator info's">
      <OperatorInfo schema={{}} id={id} reset={true} prefix="operatorInfo" />
    </WebPageContainer>
  )
}

export default OperatorInfoPage
