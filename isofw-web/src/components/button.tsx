
import i18n from "isofw-shared/src/util/i18n"
import { isObject } from "lodash"
import * as React from "react"
import { Link, Button, F7Button, Preloader } from "framework7-react";

export interface IButton extends F7Button.Props {
  text: string
  loading?: boolean
  disabled?: boolean
}

class WebButton extends React.Component<IButton, any> {
  public render() {
    const buttonProps: any = {...this.props, text: i18n.t(this.props.text)}
    if (this.props.loading || this.props.disabled) {
      buttonProps.onClick = undefined
      buttonProps.outline = true
    }

    if (this.props.loading) {
      buttonProps.text = "Loading..."
    }

    return (
      <Button
        {...buttonProps}
      >
        {this.props.loading ? <Preloader  /> : undefined}
      </Button>
    )
  }
}

export default WebButton
