import PrintPageContainer from "isofw-web/src/components/printPageContainer"
import OperatorInfo from "isofw-web/src/components/project/operatorInfo"
import { get } from "lodash"
import * as React from "react"

const OperatorInfoPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <PrintPageContainer
      requireLoggedIn={true}
      name="operatorInfo"
    >
      <OperatorInfo schema={{}} id={id} prefix="edit" />
    </PrintPageContainer>
  )
}

export default OperatorInfoPage
