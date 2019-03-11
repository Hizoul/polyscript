import evaluateMeasurements from "isofw-shared/src/network/evaluate"
import testMeasurement from "isofw-shared/src/network/testMeasurement"

describe("measurements evaluation", () => {
  it("should calculate results", async () => {
    const measures = JSON.parse(testMeasurement)
    expect(await evaluateMeasurements(measures)).toMatchSnapshot("eval results")
  }, 5000)
})
