import { get } from "lodash"
import * as React from "react"
import { View } from "react-native"
import { Text } from "react-native-elements"

class NativeFieldContainer extends React.Component<any, any> {
  public render() {
    const err = this.props.error && this.props.error.ok !== true ?  (
      <Text style={{color: "red"}}>{JSON.stringify(this.props.error)}</Text>
    ) : <View />
    let label = get(this.props, "field.mapTo")
    if (this.props.showVal) {
      label += `: ${this.props.value}`
    }
    return (
      <View>
        <Text>{label}</Text>
        {this.props.children}
        {err}
      </View>
    )
  }
}

export default NativeFieldContainer
