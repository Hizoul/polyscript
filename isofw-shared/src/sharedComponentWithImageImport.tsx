
declare function require(toImport: string): string
const cc = require("isofw-shared/res/image.jpg")

import * as React from "react"

class SharedImage extends React.Component<any, any> {
  public render() {
    const View = this.props.view
    return <View source={cc} style={{height: 100, width: 100}} src={cc}  />
  }
}

export default SharedImage
