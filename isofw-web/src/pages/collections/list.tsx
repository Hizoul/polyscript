import { registerComponents as rg} from "@xpfw/form-web"
rg()
import { registerComponents } from "@xpfw/form-bulma"
registerComponents()
import { BulmaList, registerComponents as uiComponents } from "@xpfw/ui-bulma"
uiComponents()
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import "isofw-web/src/customizedBulma.sass"

const ListPage: React.FunctionComponent<any> = (props) => {
  const collection = get(props, "match.params.collection")
  const form = ValidationRegistry.forms[collection]
  if (form == null) {
    return (
      <div>Collection not found</div>
    )
  }
  return (
    <div>
      List of {collection}
      <BulmaList form={form} />
    </div>
  )
}

export default ListPage
