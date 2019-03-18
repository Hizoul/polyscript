import { IGetHookProps, useGetWithProps } from "isofw-shared/src/util/xpfwdata"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text } from "react-native"

export interface INameDisplayer {
  getNameFrom: string
  placeholder?: string
  style?: any
}

const NativeNameDisplayer: React.FunctionComponent<IGetHookProps & INameDisplayer> = observer((props) => {
  const getHelper = useGetWithProps(props)
  return (
    <Text style={props.style}>{get(getHelper.item, props.getNameFrom, props.placeholder)}</Text>
  )
})

export default NativeNameDisplayer
