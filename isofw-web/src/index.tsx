import * as React from "react"
import * as ReactDOM from "react-dom"
import Hello from "./comp"

const ele: any = () => (
    <div>
        <Hello />
    </div>
)
document.addEventListener(`DOMContentLoaded`, () => {
    ReactDOM.render(
        ele,
        document.getElementById("root")
    )
})
