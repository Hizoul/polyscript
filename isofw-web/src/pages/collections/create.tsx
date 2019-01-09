import "isofw-web/src/components/form"
import ValidationRegistry from "@xpfw/validate"
import "isofw-web/src/customizedBulma.sass"
import { get } from "lodash"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import { BulmaCreate } from "@xpfw/ui-bulma";

const CreatePage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "match.params.collection")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <WebPageContainer requireLoggedIn={true}>Collection not found</WebPageContainer>
    )
  }
  return (
    <WebPageContainer requireLoggedIn={true}>
      Create of {collection}
      <BulmaCreate form={form} resetState={true} />
    </WebPageContainer>
  )
}

export default CreatePage
