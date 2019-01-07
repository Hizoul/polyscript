import {
  ComponentRegistry, FormErrorStore, FormStore,
  IFieldProps, SharedField
} from "@xpfw/form-shared"
import { options } from "./xpfwvalidate"

FormStore.setValue(options.relationshipAutoSelect, true)

export {
  ComponentRegistry, FormStore, FormErrorStore,
  SharedField, IFieldProps
}
