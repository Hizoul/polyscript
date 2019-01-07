import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import Comp from "isofw-web/src/comp"
import * as React from "react"

test("Verify Component", () => {
  renderSnapshot(<Comp />, "rendered")
})
