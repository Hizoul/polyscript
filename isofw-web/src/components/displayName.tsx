import { IGetHookProps, useGet, useGetWithProps } from "@xpfw/data"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

export interface INameDisplayer extends IGetHookProps {
  getNameFrom: string
  placeholder?: string
}

const NameDisplayer: React.FunctionComponent<INameDisplayer> = (props) => {
  const gotten = useGetWithProps(props)
  return (
    <span>{get(gotten.item, props.getNameFrom, props.placeholder)}</span>
  )
}

export default observer(NameDisplayer)
