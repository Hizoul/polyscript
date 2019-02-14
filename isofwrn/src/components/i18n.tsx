import i18n from "isofw-shared/src/util/i18n"
import * as React from "react"
import { Text, TextProps } from "react-native-elements"

const TranslatedText: React.FunctionComponent<TextProps & {text: string}> = (props) => {
  return (
    <Text
      {...props}
    >
      {i18n.t(props.text)}
    </Text>
  )
}

export default TranslatedText
