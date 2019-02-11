import { IFieldProps } from "isofw-shared/src/util/xpfwformshared"
import { globals } from "isofw-shared/src/util/xpfwvalidate"
import { get } from "lodash"
import * as React from "react"
import NativeFieldContainer from "./field"
declare const require: any
import { Input, SearchBar } from "react-native-elements"

class NativeTextField extends React.Component<IFieldProps, any> {
  public render() {
    const fieldType = get(this.props, "field.type")
    return (
      <SearchBar
        {...this.props}
        platform="ios"
        placeholder={get(this.props, "field.mapTo")}
        value={this.props.value}
        onChangeText={this.props.setValue}
      />
    )
  }
}

export default NativeTextField
