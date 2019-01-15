import "isofw-web/src/components/form"
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer";

const ListPage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "collection")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <WebPageContainer requireLoggedIn={true} name="Error" title="Error">Collection not found</WebPageContainer>
    )
  }
  return (
    <WebPageContainer requireLoggedIn={true} name="list" title="Listing">
      List of {collection}
      {/* <BulmaList form={form} /> */}
    </WebPageContainer>
  )
}

export default ListPage
