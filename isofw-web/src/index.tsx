import * as React from "react"
import * as ReactDOM from "react-dom"
import Hello from "./comp"

document.addEventListener(`DOMContentLoaded`, () => {
    ReactDOM.render(
        (
            <div>
                <Hello />
            </div>
        ),
        document.getElementById("root")
    )
})
