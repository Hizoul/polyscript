import { registerComponents as rg} from "@xpfw/form-web"
rg()
import { registerComponents } from "@xpfw/form-bulma"
registerComponents()
import { BulmaCreate, registerComponents as uiComponents } from "@xpfw/ui-bulma"
uiComponents()
import ValidationRegistry from "@xpfw/validate"
import "isofw-web/src/customizedBulma.sass"
import { get } from "lodash"
import * as React from "react"

const CreatePage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "match.params.collection")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <div>Collection not found</div>
    )
  }
  return (
    <div>
      Create of {collection}
      <BulmaCreate form={form} resetState={true} />
    </div>
  )
}

export default CreatePage
