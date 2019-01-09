import "isofw-web/src/components/form"
import { BulmaEdit } from "@xpfw/ui-bulma"
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import * as React from "react"
import "isofw-web/src/customizedBulma.sass"

const EditPage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "match.params.collection")
  const id = get(props, "match.params.id")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <WebPageContainer requireLoggedIn={true}>Collection not found</WebPageContainer>
    )
  }
  return (
    <WebPageContainer requireLoggedIn={true}>
      Create of {collection}
      <BulmaEdit form={form} id={id} resetState={true} />
    </WebPageContainer>
  )
}

export default EditPage
