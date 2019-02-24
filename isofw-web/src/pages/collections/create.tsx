import { BlockTitle } from "framework7-react"
import getForm from "isofw-shared/src/util/getForm"
import "isofw-web/src/components/form"
import WrappedFramework7Create from "isofw-web/src/components/form/create"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import { get } from "lodash"
import * as React from "react"

const CreatePage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "collection")
  const form = getForm(collection)
  if (form == null) {
    return (
      <WebPageContainer backLink={true} requireLoggedIn={true} name="Error" title="Error">
        Collection not found
      </WebPageContainer>
    )
  }
  return (
    <WebPageContainer backLink={true} requireLoggedIn={true} name="Create" title="Create">
      <BlockTitle>Fill in {collection.substring(0, collection.length - 1)} information</BlockTitle>
      <WrappedFramework7Create schema={form} prefix={"create"} />
    </WebPageContainer>
  )
}

export default CreatePage
