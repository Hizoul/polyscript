import { registerComponents as registerWeb } from "@xpfw/form-web"
import { registerComponents } from "@xpfw/form-bulma"
import { ComponentRegistry } from "@xpfw/form-shared"
import { registerComponents as regUiComp } from "@xpfw/ui-bulma"
import { FieldType } from "@xpfw/validate"
import BulmaArrayField from "isofw-web/src/components/form/array"
import ObjectField from "isofw-web/src/components/form/object"
import TextField from "isofw-web/src/components/form/text"
import BulmaBooleanField from "./boolean"

registerWeb()
registerComponents()
regUiComp()
ComponentRegistry.registerComponent(FieldType.Text, TextField)
ComponentRegistry.registerComponent(FieldType.Array, BulmaArrayField)
// ComponentRegistry.registerComponent(FieldType.Object, ObjectField)
