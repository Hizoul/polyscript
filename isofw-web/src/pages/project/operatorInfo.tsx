import "isofw-web/src/components/form"
import { get } from "lodash"
import * as React from "react"
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project";
import WebPageContainer from "isofw-web/src/components/pageContainer";
import OperatorInfo from "isofw-web/src/components/project/operatorInfo";

const OperatorInfoPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <WebPageContainer requireLoggedIn={true} name="operatorInfo" title="Operator info's">
      <OperatorInfo form={ProjectForm} id={id} resetState={true} prefix="operatorInfo" />
    </WebPageContainer>
  )
}

export default OperatorInfoPage
