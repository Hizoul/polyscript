import { IFieldProps } from "@xpfw/form-shared"
import { TextField } from "@xpfw/form-web"
import { get } from "lodash"
import * as React from "react"
import FieldContainer from "./fieldWrapper"

class BulmaTextField extends React.Component<IFieldProps, any> {
  public render() {
    const gotErr = get(this.props, "error.errors.length", 0) > 0
    const classNames = `input ${gotErr ? "is-danger" : "is-success"}`
    console.log("IN TEXT FIELD WITH", this.props)
    return (
      <FieldContainer {...this.props}>
        <TextField
          {...this.props}
          className={classNames}
          value={this.props.value == null ? "" : this.props.value}
        />
      </FieldContainer>
    )
  }
}

export default BulmaTextField
