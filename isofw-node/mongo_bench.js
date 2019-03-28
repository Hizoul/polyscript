const m = require("mongodb")
const performance = require("perf_hooks").performance

const sortNumAscending = (a, b) => a - b
const MongoClient = m.MongoClient

const FullObj = require("./obj")
const mulberry32 = (a) => {
  return () => {
    let t = a += 0x6D2B79F5
    t = Math.imul(t ^ t >>> 15, t | 1)
    t ^= t + Math.imul(t ^ t >>> 7, t | 61)
    return ((t ^ t >>> 14) >>> 0) / 4294967296
  }
}

const random = {
  function: mulberry32(Math.floor((Math.random() * Number.MAX_SAFE_INTEGER) + Number.MIN_SAFE_INTEGER)),
  setSeed: (seed) => {
    random.function = mulberry32(seed)
  }
}

const randomInRange = (min, max) => {
  return Math.floor((random.function() * max) + min)
}

const range = (from, to, step = 1) => {
  const rangeArray = []
  for (let i = from; i < to; i += step) {
    rangeArray.push(i)
  }
  return rangeArray
}

const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
const randomString = (length) => {
  let text = ""
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(random.function() * possible.length))
  }
  return text
}

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

const projectId = "5c93963c1a18bd2c58a21736"

const doTest = async (type) => {
  const con = await MongoClient.connect("mongodb://localhost:27017", {useNewUrlParser: true})
  const db = con.db("poly-direct")
  const projects = db.collection("projects")
  let measurements = []
  for (let i = 0; i < 50000; i++) {
    const start = performance.now()
    switch (type) {
      case "patchProgram": {
        await projects.updateOne({_id: new m.ObjectId(projectId)}, {$set: {[`program.${randomInRange(0, 499)}`]: makeRandomProgrmanEntry()}})
        break
      }
      case "patchNr": {
        await projects.updateOne({_id: new m.ObjectId(projectId)}, {$set: {shot: randomInRange(0, 499)}})
        break
      }
      case "fullSet":
      default: {
        await projects.updateOne({_id: new m.ObjectId(projectId)}, {$set: FullObj})
        break
      }
    }
    measurements.push(performance.now() - start)
  }
  await con.close()
  let sum = 0
  for (const m of measurements) {
    sum += m
  }
  measurements.sort(sortNumAscending)
  console.log(`${type}: Average is ${sum / measurements.length} Median is ${measurements[Math.round(measurements.length / 2)]}. Fastest is ${measurements[0]} slowest was ${measurements[measurements.length - 1]}`)
}


doTest("patchNr")
doTest("ptachProgram")
doTest("fullSet")