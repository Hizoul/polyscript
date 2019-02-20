import * as React from "react"

const makeMockElement = (name: string, stringifier?: (props: any) => any) => {
  return (props: any) => {
    const toStringify = stringifier != null ? stringifier(props) : {...props, children: undefined}
    return (
      <div className={name}>
        {JSON.stringify(toStringify, undefined, 2)}
        {props.children}
      </div>
    )}
  }

export default makeMockElement
