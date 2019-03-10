import val from "isofw-shared/src/globals/val"
import { randomInRange, randomString } from "isofw-shared/src/util/predictableRandomness"
import BenchmarkStore from "./benchmarkStore"
import { IBenchmarkClient } from "./clientBenchmarker"

const makeRandomProgrmanEntry = () => {
  return {
    pname: randomString(32),
    movement: randomString(16),
    movementTowards: randomString(8),
    duration: randomInRange(1, 8),
    importance: randomString(1),
    type: randomString(1),
    directorRemarks: randomString(64),
    operatorRemarks: randomString(64),
    camera: randomString(32)
  }
}

const makeRandomDisabledCameras = () => {
  const ret = []
  for (let i = 0; i < randomInRange(3, 25); i++) {
    ret.push(randomString(32))
  }
  return ret
}
const amountOfCalls = 150
const causeProjectTraffic = async (client: IBenchmarkClient, projectId: string, type?: number) => {
  BenchmarkStore.uploaded = false
  client.measurements = []
  const program = []
  for (let i = 0; i < 250; i++) {
    program.push(makeRandomProgrmanEntry())
  }
  BenchmarkStore.total = amountOfCalls
  for (let i = 1; i <= amountOfCalls; i++) {
    BenchmarkStore.currentlyAt = i
    switch (randomInRange(0, 3)) {
      case 0: {
        await client.patch(val.service.project, projectId, {
          title: randomString(64)
        })
        break
      }
      case 1: {
        await client.patch(val.service.project, projectId, {
          shot: randomInRange(0, 250)
        })
        break
      }
      case 2: {
        await client.patch(val.service.project, projectId, {
          disabledCameras: makeRandomDisabledCameras()
        })
        break
      }
      case 3: {
        program[randomInRange(0, 249)] = makeRandomProgrmanEntry()
        await client.patch(val.service.project, projectId, {
          program
        })
        break
      }
    }
  }
  // writeFileSync(`network${type}${projectId}.txt`, JSON.stringify(client.measurements))
  await client.persistResults()
  BenchmarkStore.uploaded = true
}

export default causeProjectTraffic
