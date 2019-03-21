import { readFileSync, writeFileSync } from "fs"
import evaluate from "isofw-shared/src/network/evaluate"

const doEval = async () => {
  const file = readFileSync("./pc-wss-tcp-onlyDiff.txt", "UTF-8")
  const result = await evaluate(JSON.parse(file))
  writeFileSync("./result-pc-onlyDiff.txt", JSON.stringify(result, undefined, 2))
}
doEval()
