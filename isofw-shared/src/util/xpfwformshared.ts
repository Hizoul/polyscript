import {
  ComponentRegistry, FormErrorStore, FormStore,
  IArrayProps, IFieldProps, LoadingStore, SharedArray,
  SharedField
} from "@xpfw/form-shared"
import { options } from "./xpfwvalidate"

FormStore.setValue(options.relationshipAutoSelect, true)

export {
  ComponentRegistry, FormStore, FormErrorStore,
  SharedField, IFieldProps, SharedArray, IArrayProps,
  LoadingStore
}
