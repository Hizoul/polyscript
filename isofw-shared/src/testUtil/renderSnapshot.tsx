import * as React from "react"
const render = require("preact-render-to-json")

const renderSnapshot = (component: any, msg: string) => {
  expect(render(component)).toMatchSnapshot(msg)
}

export default renderSnapshot
