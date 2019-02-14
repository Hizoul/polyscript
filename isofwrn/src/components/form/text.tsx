import { IFieldProps } from "isofw-shared/src/util/xpfwformshared"
import { globals } from "isofw-shared/src/util/xpfwvalidate"
import { get } from "lodash"
import * as React from "react"
import NativeFieldContainer from "./field"
declare const require: any
import { Input } from "react-native-elements"

class NativeTextField extends React.Component<IFieldProps, any> {
  public render() {
    const fieldType = get(this.props, "field.type")
    let secureTextEntry = false
    let keyboardType: any = "default"
    if (fieldType === globals.FieldType.Number) {
      keyboardType = "numeric"
    } else if (fieldType === globals.FieldType.Password) {
      secureTextEntry = true
    }
    return (
      <Input
        {...this.props}
        label={get(this.props, "field.mapTo")}
        secureTextEntry={secureTextEntry}
        value={this.props.value}
        keyboardType={keyboardType}
        onChangeText={this.props.setValue}
      />
    )
  }
}

export default NativeTextField
