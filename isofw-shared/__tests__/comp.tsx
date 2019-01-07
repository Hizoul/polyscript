import Comp from "isofw-shared/src/comp"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import * as React from "react"

test("Verify Component", () => {
  const mockEle = makeMockElement("mzmock")
  renderSnapshot(<Comp view={mockEle} />, "rendered")
})
