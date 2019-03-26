import { readFileSync, writeFileSync } from "fs"
import evaluate from "isofw-shared/src/network/evaluate"

const doEval = async () => {
  const file = readFileSync("./onlyProgram-onlyDiff.txt", "UTF-8")
  const result = await evaluate(JSON.parse(file))
  writeFileSync("./result-dbbench.txt", JSON.stringify(result, undefined, 2))
}
doEval()
