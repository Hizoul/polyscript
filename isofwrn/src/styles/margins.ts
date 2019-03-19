import { StyleSheet } from "react-native"

const defaultMargin = 5

const margins = StyleSheet.create({
  leftRight: {
    marginRight: defaultMargin,
    marginLeft: defaultMargin
  },
  top: {
    marginTop: defaultMargin
  },
  topBot: {
    marginTop: defaultMargin,
    marginBottom: defaultMargin
  },
  noPadding: {padding: 0}
})

export default margins
