import "isofw-web/src/components/form"
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import * as React from "react"

const EditPage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "collection")
  const id = get(props, "id")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <WebPageContainer requireLoggedIn={true} name="Error" title="Error">Collection not found</WebPageContainer>
    )
  }
  return (
    <WebPageContainer requireLoggedIn={true} name="Edit" title="Edit">
      Edit of {collection}
      {/* <BulmaEdit form={form} id={id} resetState={true} /> */}
    </WebPageContainer>
  )
}

export default EditPage
