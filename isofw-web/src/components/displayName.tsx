import { IFormShowProps, SharedFormShow } from "@xpfw/ui-shared"
import { get } from "lodash"
import * as React from "react"

export interface INameDisplayer {
  getNameFrom: string
}

class WebRelationshipItem extends React.Component<IFormShowProps & INameDisplayer, any> {
  public render() {
    return (
      <span>{get(this.props.item, this.props.getNameFrom)}</span>
    )
  }
}

export default SharedFormShow<INameDisplayer>(WebRelationshipItem)
