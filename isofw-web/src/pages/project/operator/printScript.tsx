import PrintPageContainer from "isofw-web/src/components/printPageContainer"
import { get } from "lodash"
import * as React from "react"
import ScriptPrintView from "isofw-web/src/components/project/print/script"

const OperatorInfoPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <PrintPageContainer
      requireLoggedIn={true}
      name="operatorInfo"
    >
      <ScriptPrintView schema={{}} id={id} prefix="edit" />
    </PrintPageContainer>
  )
}

export default OperatorInfoPage
