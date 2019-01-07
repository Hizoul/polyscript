import NativeContent from "isofw-ns/app/start"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import * as React from "react"

test("Verify app rendering", () => {
  renderSnapshot(<NativeContent />, "rendered")

})