import numberToBinary, { increaseNumberAt } from "isofw-shared/src/cameraApi/numberToBinary"

const arrEqual = (a: any[], b: any[]) => {
  for (let i = 0; i < a.length; i++) {
    if (a[i] != b[i]) {
      return false
    }
  }
  return true
}

describe("NumberToBinary test", () => {
  it("Should convert correctly", () => {
    const a = [8, 0, 13, 2]
    const b = [5, 15, 2, 13]

    expect(numberToBinary(-175, [8, 0, 13, 2], [5, 15, 2, 13], -175, 175)).toEqual("2D08")
    expect(numberToBinary(0, [8, 0, 13, 2], [5, 15, 2, 13], -175, 175)).toEqual("7FFF")
    expect(numberToBinary(175, [8, 0, 13, 2], [5, 15, 2, 13], -175, 175)).toEqual("D2F5")
  })
})
