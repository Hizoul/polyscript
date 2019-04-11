import { readFileSync, writeFileSync } from "fs"
import evaluate from "isofw-shared/src/network/evaluate"

const toEval = [
  "pc-wss-dbbench",
  "pc-wss-nodiff-allDeviceConfigs",
  "pc-tcp-nocompress-nodiff-multiDevice",
  "pc-tcp-nocompress-nodiff",
  "pc-wss-onlyDiff",
  "pc-wss-onlyDiff-multiDevice",
  "rpilan-wss-dbbenchs",
  "rpilan-wss-nodiff-allDeviceConfigs",
  "rpilan-wss-noDiff-multidevice",
  "rpilan-wss-nodiff",
  "rpilan-wss-onlyDiff",
  "rpilan-wss-onlyDiff-multiDevice",
  "rpilan-tcp-nocompress-nodiff-multiDevice",
  "rpilan-tcp-nocompress-nodiff",
  "rpilan-tcp-nocompress-onlyDiff-multiDevice",
  "rpilan-tcp-nocompress-onlyDiff",
  "rpilan-tcp-compress-nodiff"
]

const doEval = async () => {
  for (const e of toEval) {
    const file = readFileSync(`./${e}.txt`, "UTF-8")
    console.log("READING FILE", e)
    const result = await evaluate(JSON.parse(file))
    writeFileSync(`./result-${e}.txt`, JSON.stringify(result, undefined, 2))
  }
}
doEval()
