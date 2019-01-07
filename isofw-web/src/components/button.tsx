
import i18n from "isofw-shared/src/util/i18n"
import { isObject } from "lodash"
import * as React from "react"

export interface IButton {
  className?: string
  text: string
  onClick?: any
  loading?: boolean
  disabled?: boolean
  icon?: {type: string, name: string}
  leftIcon?: boolean
  rightIcon?: boolean
}

class WebButton extends React.Component<IButton, any> {
  public render() {
    let classNames = `button ${this.props.className}`
    let onClick = this.props.onClick
    if (this.props.loading) {
      onClick = undefined
      classNames += " is-loading is-outlined"
    }
    if (this.props.disabled) {
      onClick = undefined
      classNames += " is-outlined"
    }
    let IconToDisplay
    if (isObject(this.props.icon)) {
      IconToDisplay = (
        <span className="icon is-small">icon
        </span>
      )
    }
    return (
      <a
        className={classNames}
        onClick={onClick}
      >
        {this.props.leftIcon ? IconToDisplay : null}
        <span>
        {i18n.t(this.props.text)}
        </span>
        {this.props.rightIcon ? IconToDisplay : null}
      </a>
    )
  }
}

export default WebButton
