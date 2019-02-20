import { IFieldProps, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import * as React from "react"
import {  SearchBar } from "react-native-elements"

const NativeSearchField: React.FunctionComponent<IFieldProps> = (props) => {
  const fieldHelper = useFieldWithValidation(props)
  return (
    <SearchBar
      {...props}
      platform="ios"
      placeholder={get(props, "schema.title")}
      value={fieldHelper.value}
      onChangeText={fieldHelper.setValue}
    />
  )
}

export default NativeSearchField
