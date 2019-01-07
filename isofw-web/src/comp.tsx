import SharedImage from "isofw-shared/src/sharedComponentWithImageImport"
import ImgRenderer from "isofw-web/src/imgRenderer"
import * as React from "react"

class WebPage extends React.Component<any, any> {
  public render() {
    return (<div><span>Thisisweb</span><SharedImage view={ImgRenderer} /></div>)
  }
}

export default WebPage
