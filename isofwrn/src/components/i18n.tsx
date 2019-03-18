import i18n from "isofw-shared/src/util/i18n"
import * as React from "react"
import { Text, TextProps } from "react-native-elements"

const I18n: React.FunctionComponent<TextProps & {
  text: string
  textParams?: any[]
}> = (props) => {
  return (
    <Text
      {...props}
    >
      {i18n.t(props.text, props.textParams)}
    </Text>
  )
}

export default I18n
