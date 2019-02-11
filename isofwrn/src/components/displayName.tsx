import { IFormShowProps, SharedFormShow } from "isofw-shared/src/util/xpfwuishared"
import { get } from "lodash"
import * as React from "react"
import { Text } from "react-native"

export interface INameDisplayer {
  getNameFrom: string
  placeholder?: string
  style?: any
}

class NativeRelationshipItem extends React.Component<IFormShowProps & INameDisplayer, any> {
  public render() {
    return (
      <Text style={this.props.style}>{get(this.props.item, this.props.getNameFrom, this.props.placeholder)}</Text>
    )
  }
}

const NativeNameDisplayer = SharedFormShow<INameDisplayer>(NativeRelationshipItem)
export default NativeNameDisplayer
