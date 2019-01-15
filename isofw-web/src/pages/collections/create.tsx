import "isofw-web/src/components/form"
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import WebPageContainer from "isofw-web/src/components/pageContainer";
import WrappedFramework7Create from "isofw-web/src/components/form/create";
import { BlockTitle } from "framework7-react";

const CreatePage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "collection")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <WebPageContainer requireLoggedIn={true} name="Error" title="Error">Collection not found</WebPageContainer>
    )
  }
  return (
    <WebPageContainer requireLoggedIn={true} name="Create" title="Create">
      <BlockTitle>Fill in {collection.substring(0, collection.length-1)} information</BlockTitle>
      <WrappedFramework7Create form={form} resetState={true} />
    </WebPageContainer>
  )
}

export default CreatePage
