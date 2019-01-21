import { IFormShowProps, SharedFormShow } from "@xpfw/ui-shared"
import { get } from "lodash"
import * as React from "react"

export interface INameDisplayer {
  getNameFrom: string
  placeholder?: string
}

class WebRelationshipItem extends React.Component<IFormShowProps & INameDisplayer, any> {
  public render() {
    return (
      <span>{get(this.props.item, this.props.getNameFrom, this.props.placeholder)}</span>
    )
  }
}

export default SharedFormShow<INameDisplayer>(WebRelationshipItem)
