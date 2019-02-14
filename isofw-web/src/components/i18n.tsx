import i18n from "isofw-shared/src/util/i18n"
import * as React from "react"

const TranslatedText: React.FunctionComponent<{text: string, style?: any}> = (props) => {
  return (
    <span
      {...props}
    >
      {i18n.t(props.text)}
    </span>
  )
}

export default TranslatedText
