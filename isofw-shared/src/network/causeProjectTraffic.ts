import { DbStore } from "@xpfw/data/dist"
import { FormStore, prependPrefix } from "@xpfw/form/dist"
import val from "isofw-shared/src/globals/val"
import { randomInRange, randomString } from "isofw-shared/src/util/predictableRandomness"
import {
  DisabledCameras, ProjectForm, ProjectName, ProjectProgram, ProjectShot
} from "isofw-shared/src/xpfwDefs/project"
import BenchmarkStore from "./benchmarkStore"
import { IBenchmarkClient } from "./clientBenchmarker"

const directorPrefix = "edit"
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

const makeRandomProgram = () => {
  const program: any[] = []
  for (let i = 0; i < BenchmarkStore.programSize; i++) {
    program.push(makeRandomProgrmanEntry())
  }
  return program
}

const makeRandomDisabledCameras = () => {
  const ret: any[] = []
  for (let i = 0; i < 15; i++) {
    ret.push(randomString(32))
  }
  return ret
}
const amountOfCalls = 50
const causeProjectTraffic = async (client: IBenchmarkClient, projectId: string, type?: number) => {
  BenchmarkStore.uploaded = false
  BenchmarkStore.loading = true
  client.measurements = []
  const program = makeRandomProgram()
  BenchmarkStore.total = amountOfCalls
  const promises: any[] = []
  for (let i = 1; i <= amountOfCalls; i++) {
    switch (i % 4) {
      case 0: {
        FormStore.setValue(ProjectName.title, randomString(64), prependPrefix(ProjectForm.title, directorPrefix))
        break
      }
      case 1: {
        FormStore.setValue(ProjectShot.title,
          randomInRange(1, BenchmarkStore.programSize), prependPrefix(ProjectForm.title, directorPrefix))
        break
      }
      case 2: {
        FormStore.setValue(DisabledCameras.title, makeRandomDisabledCameras(),
          prependPrefix(ProjectForm.title, directorPrefix))
        break
      }
      default:
      case 3: {
        for (let b = 0; b < Math.max(1, i % 10); b++) {
          program[randomInRange(0, BenchmarkStore.programSize)] = makeRandomProgrmanEntry()
        }
        FormStore.setValue(ProjectProgram.title, program, prependPrefix(ProjectForm.title, directorPrefix))
        break
      }
    }
    const patchPromise = DbStore.patch(projectId, ProjectForm, ProjectForm.title, directorPrefix)
    if (!BenchmarkStore.parallel) {
      BenchmarkStore.currentlyAt = i
      await patchPromise
    } else {
      promises.push(patchPromise)
    }
  }
  if (BenchmarkStore.parallel) {
    let i = 0
    for (const promise of promises) {
      await promise
      BenchmarkStore.currentlyAt = ++i
    }
  }
  // writeFileSync(`network${type}${projectId}.txt`, JSON.stringify(client.measurements))
  await client.persistResults()
  BenchmarkStore.uploaded = true
  BenchmarkStore.loading = false
}

export default causeProjectTraffic
export {
  makeRandomProgram
}
