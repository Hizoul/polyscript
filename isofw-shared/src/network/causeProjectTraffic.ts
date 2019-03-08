import val from "isofw-shared/src/globals/val"
import { randomInRange, randomString } from "src/util/predictableRandomness"
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

const causeProjectTraffic = async (client: IBenchmarkClient, projectId: string) => {
  const program = []
  for (let i = 0; i < 250; i++) {
    program.push(makeRandomProgrmanEntry())
  }
  for (let i = 0; i < 1500; i++) {
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
  await client.persistResults()
}

export default causeProjectTraffic
