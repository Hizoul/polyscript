import PrintPageContainer from "isofw-web/src/components/printPageContainer"
import PresetPrintView from "isofw-web/src/components/project/print/preset"
import { get } from "lodash"
import * as React from "react"

const OperatorInfoPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <PrintPageContainer
      requireLoggedIn={true}
      name="operatorInfo"
      isPreset={true}
      id={id}
    >
      <PresetPrintView schema={{}} id={id} prefix="edit" />
    </PrintPageContainer>
  )
}

export default OperatorInfoPage
