import { Searchbar } from "framework7-react"
import { getMapToFromProps, IFieldProps, useFieldWithValidation } from "isofw-shared/src/util/xpfwform"
import * as React from "react"
import { observer } from "mobx-react-lite";

const SearchBarField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const fieldHelper = useFieldWithValidation(props.schema, getMapToFromProps(props), props.prefix, {
    valueEventKey: "nativeEvent.target.value"
  })
  return (
    <Searchbar
      value={fieldHelper.value}
      onChange={fieldHelper.setValue}
      customSearch={true}
    />
  )
})

export default SearchBarField
