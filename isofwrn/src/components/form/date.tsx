
import { IFieldProps } from "isofw-shared/src/util/xpfwformshared"
import * as React from "react"
import { Platform, Text } from "react-native"
import AndroidDate from "./date.android"
declare const require: any

export default class NativeDateField extends React.Component<IFieldProps, any> {
  public render() {
    if (Platform.OS === "ios") {
      return <Text>iOS Datepicker TBD</Text>
    }
    return <AndroidDate {...this.props} />
  }
}
