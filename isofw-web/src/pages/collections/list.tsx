import "isofw-web/src/components/form"
import { BulmaList } from "@xpfw/ui-bulma"
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import "isofw-web/src/customizedBulma.sass"

const ListPage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "match.params.collection")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <WebPageContainer requireLoggedIn={true}>Collection not found</WebPageContainer>
    )
  }
  return (
    <WebPageContainer requireLoggedIn={true}>
      List of {collection}
      <BulmaList form={form} />
    </WebPageContainer>
  )
}

export default ListPage
