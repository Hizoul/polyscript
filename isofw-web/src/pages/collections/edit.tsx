import "isofw-web/src/components/form"
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import * as React from "react"
import Framework7Edit from "isofw-web/src/components/form/edit";
import { BlockTitle } from "framework7-react";

const EditPage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "collection")
  const id = get(props, "id")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <WebPageContainer backLink requireLoggedIn={true} name="Error" title="Error">Collection not found</WebPageContainer>
    )
  }
  return (
    <WebPageContainer backLink requireLoggedIn={true} name="Edit" title="Edit">
      <BlockTitle>Adjust information of {id} in {collection.substring(0, collection.length-1)}</BlockTitle>
      <Framework7Edit form={form} id={id} resetState={true} />
    </WebPageContainer>
  )
}

export default EditPage
