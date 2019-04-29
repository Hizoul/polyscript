import console = require("console")
import { readFileSync } from "fs"
import { get } from "lodash"

export interface IConfig {
  avgName: string
  medianName: string
  fastestName: string
  slowestName: string
  sortBy: string
  networkPc?: string
  networkRpi?: string
}

const getGlobalSpeedRanking = async (pcFile: string, rpiFile: string, config: IConfig) => {
  const res = JSON.parse(readFileSync(pcFile, "UTF-8"))
  const resPi = JSON.parse(readFileSync(rpiFile, "UTF-8"))
  const speeds: any[] = []
  let totalAvgDist = 0
  let totalMedianDist = 0
  let totalTime = 0
  let totalTimeRpi = 0
  let total = 0
  for (const device of Object.keys(res)) {
    const v = res[device][get(config, "networkPc", "0")]
    const rpi = resPi[device] != null ? resPi[device][get(config, "networkRpi", "0")] : {[config.avgName]: v[config.avgName]}
    let avgDist = 0
    let medianDist = 0
    totalTime += v[config.avgName]
    totalTimeRpi += rpi[config.avgName]
    if (rpi[config.avgName] !== v[config.avgName]) {
      avgDist = rpi[config.avgName] - v[config.avgName]
      medianDist = rpi[config.medianName] - v[config.medianName]
      totalAvgDist += avgDist
      totalMedianDist += medianDist
      total++
    }
    speeds.push({
      device,
      time: v[config.avgName],
      median: v[config.medianName],
      slowest: v[config.slowestName],
      fastest: v[config.fastestName],
      timeRpi: rpi[config.avgName],
      medianRpi: rpi[config.medianName],
      slowestRpi: rpi[config.slowestName],
      fastestRpi: rpi[config.fastestName],
      avgDist, medianDist
    })
  }
  speeds.sort((a: any, b: any) => a[`${config.sortBy}Rpi`] - b[`${config.sortBy}Rpi`])
  let i = 0
  for (const s of speeds) {
    s.rpiIndex = i
    i++
  }
  speeds.sort((a: any, b: any) => a[config.sortBy] - b[config.sortBy])
  i = 0
  for (const s of speeds) {
    s.index = i
    i++
  }
  const result = {
    speeds,
    avgDist: totalAvgDist / total,
    medianDist: totalMedianDist / total,
    avgRpi: totalTimeRpi /  total,
    avgPc: totalTime / speeds.length
  }
  console.log("RES IS", result)
  return result
}
const roundTripConfig: IConfig = {
  avgName: "avgProcessTime",
  medianName: "medianRoundTrip",
  slowestName: "slowestRoundTrip",
  fastestName: "fastestRoundTrip",
  sortBy: "time"
}
const serverTimeConfig: IConfig = {
  avgName: "avgServerTime",
  medianName: "medianServerProcessTime",
  slowestName: "slowestServerProcessTime",
  fastestName: "fastestServerProcessTime",
  sortBy: "time"
}
const networkTimeConfig: IConfig = {
  avgName: "avgNetworkTime",
  medianName: "medianNetworkTime",
  slowestName: "slowestNetworkTime",
  fastestName: "fastestNetworkTime",
  sortBy: "time"
}

// GLOBAL DEVICE RANKING
// getGlobalSpeedRanking(`./result-pc-wss-nodiff-allDeviceConfigs.txt`,
// `./result-rpilan-wss-nodiff-allDeviceConfigs.txt`, roundTripConfig)
// DB RANKING speak about how rpi does not have the same sort as pc!
// getGlobalSpeedRanking(`./result-pc-wss-dbbench.txt`, `./result-rpilan-wss-dbbenchs.txt`, serverTimeConfig)
getGlobalSpeedRanking(`./result-rpilan-wss-dbbenchs.txt`, `./result-pc-wss-dbbench.txt`, serverTimeConfig)
// TCP VS WSS PC
// getGlobalSpeedRanking(`./result-pc-tcp-nocompress-nodiff.txt`,
// `./result-pc-wss-nodiff-allDeviceConfigs.txt`, {...roundTripConfig, networkPc: "1"})
// TCP VS WSS RPI
// getGlobalSpeedRanking(`./result-rpilan-tcp-nocompress-nodiff.txt`,
// `./result-rpilan-wss-nodiff-allDeviceConfigs.txt`, {...roundTripConfig, networkPc: "1"})
// TCP compress vs nocompress
// getGlobalSpeedRanking(`./result-rpilan-tcp-compress-nodiff.txt`,
// `./result-rpilan-tcp-nocompress-nodiff.txt`, {...roundTripConfig, networkPc: "1", networkRpi: "1"})
// stress breaks the RPI
// getGlobalSpeedRanking(`./result-rpilan-wss-onlyDiff.txt`, `./result-rpilan-wss-onlyDiff-multiDevice.txt`, serverTimeConfig)
// stress does not break the pc
// getGlobalSpeedRanking(`./result-pc-wss-onlyDiff.txt`, `./result-pc-wss-onlyDiff-multiDevice.txt`, serverTimeConfig)
