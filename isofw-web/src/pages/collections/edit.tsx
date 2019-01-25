import ValidationRegistry from "@xpfw/validate"
import { BlockTitle } from "framework7-react"
import "isofw-web/src/components/form"
import Framework7Edit from "isofw-web/src/components/form/edit"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import { get } from "lodash"
import * as React from "react"

const EditPage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "collection")
  const id = get(props, "id")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <WebPageContainer backLink={true} requireLoggedIn={true} name="Error" title="Error">
        Collection not found
      </WebPageContainer>
    )
  }
  return (
    <WebPageContainer backLink={true} requireLoggedIn={true} name="Edit" title="Edit">
      <BlockTitle>Adjust information of {id} in {collection.substring(0, collection.length - 1)}</BlockTitle>
      <Framework7Edit form={form} id={id} resetState={true} />
    </WebPageContainer>
  )
}

export default EditPage
