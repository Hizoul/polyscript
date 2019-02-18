import { IFieldProps } from "@xpfw/form-shared"
import { get } from "lodash"
import * as React from "react"
import FieldContainer from "./fieldWrapper"

class BulmaBooleanField extends React.Component<IFieldProps, any> {
  private onChange: any
  constructor(props: any) {
    super(props)
    this.onChange = () => {}
  }
  public render() {
    const gotErr = get(this.props, "error.errors.length", 0) > 0
    const classNames = `input ${gotErr ? "is-danger" : "is-success"}`
    return (
      <label className="checkbox flex inline center marginTop" style={{transform: "scale(1.2)"}}>
        <input
          type="checkbox"
          style={{marginRight: "0.3rem"}}
          checked={this.props.value}
          onChange={this.onChange}
        />
        {this.props.field.mapTo === "showMine" ? "Alleen mijn afspraken" : this.props.field.mapTo}
      </label>
    )
  }
}

export default BulmaBooleanField
