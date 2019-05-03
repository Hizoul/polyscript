import i18n from "isofw-shared/src/util/i18n"
import * as React from "react"

const I18n: React.FunctionComponent<{
  text: string, textParams?: any[], style?: any, className?:any
}> = (props) => {
  return (
    <span
      {...props}
    >
      {i18n.t(props.text, props.textParams)}
    </span>
  )
}

export default I18n
