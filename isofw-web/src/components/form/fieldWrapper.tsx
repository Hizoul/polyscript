import { globals } from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"

class FieldContainer extends React.Component<any, any> {
  public render() {
    const err = this.props.error && this.props.error.ok !== true ?
     <p className="help is-danger">{JSON.stringify(this.props.error)}</p> : null
    const isSlider = get(this.props, "field.type") === globals.FieldType.Slider
    let labelText = `${get(this.props, "field.mapTo")} ${isSlider && this.props.value ? `: ${this.props.value}` : ``}`
    if (labelText.indexOf("from") !== -1) {
      labelText = "Vanaf"
    } else if (labelText.indexOf("until") !== -1) {
      labelText = "Tot"
    }
    return (
      <div className="field">
        <label className="label center">{labelText}</label>
        {this.props.children}
        {err}
      </div>
    )
  }
}

export default FieldContainer
