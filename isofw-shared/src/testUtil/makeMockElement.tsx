import * as React from "react"

const makeMockElement = (name: string, showChildren: boolean = false) => {
  return (props: any) => (
    <div className={name}>
      {JSON.stringify({...props, children: undefined}, undefined, 2)}
      {props.children}
    </div>
  )
  }

export default makeMockElement
