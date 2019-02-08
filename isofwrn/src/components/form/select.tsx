
import { IFieldProps } from "isofw-shared/src/util/xpfwformshared"
import { get, map } from "lodash"
import * as React from "react"
declare const require: any
import { Picker } from "react-native"

export default class NativeSelectField extends React.Component<IFieldProps, any> {
  public render() {
    const selOpts = get(this.props, "field.selectOptions", [])
    const options = map(selOpts, (option: any) => {
      return (
        <Picker.Item key={option.value} value={option.value} label={option.label} />
      )
    })
    return (
      <Picker
        selectedValue={this.props.value}
        onValueChange={this.props.setValue}
      >
        {options}
      </Picker>
    )
  }
}
