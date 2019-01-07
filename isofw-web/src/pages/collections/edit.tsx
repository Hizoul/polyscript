import { registerComponents as rg} from "@xpfw/form-web"
rg()
import { registerComponents } from "@xpfw/form-bulma"
registerComponents()
import { BulmaEdit, registerComponents as uiComponents } from "@xpfw/ui-bulma"
uiComponents()
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import "isofw-web/src/customizedBulma.sass"

const EditPage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "match.params.collection")
  const id = get(props, "match.params.id")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <div>Collection not found</div>
    )
  }
  return (
    <div>
      Create of {collection}
      <BulmaEdit form={form} id={id} resetState={true} />
    </div>
  )
}

export default EditPage
