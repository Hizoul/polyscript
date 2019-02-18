import { IFieldProps } from "@xpfw/form-shared"
import { ListInput } from "framework7-react"
import { get, isFunction } from "lodash"
import * as React from "react"
import i18n from "isofw-shared/src/util/i18n"

class SelectField extends React.Component<IFieldProps, any> {
  private onChange: any
  constructor(props: any) {
    super(props)
    this.onChange = ()=> {}
  }
  public render() {
    let selOpts = get(this.props, "field.selectOptions", [])
    if (isFunction(selOpts)) {
      selOpts = selOpts(this.props.value, this.props.field, this.props)
    }
    const options = selOpts.map((option: any) => {
      return (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      )
    })
    return (
      <ListInput
        type="select"
        label={i18n.t(get(this.props, "field.mapTo"))}
        className={this.props.className}
        value={this.props.value ? this.props.value : "n"}
        onChange={this.onChange}
      >
        {options}
      </ListInput>
    )
  }
}

export default SelectField
