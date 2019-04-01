import { lstatSync, readdirSync, readFileSync } from "fs"
import { resolve } from "path"
import projectDirectories from "./projectDirectories"

const countLines = (directory: string, accountTowards: string) => {
  let count = 0
  let chars = 0
  let files = 0
  for (const entry of readdirSync(directory)) {
    const subPath = resolve(directory, entry)
    const fileInfo = lstatSync(subPath)
    if (fileInfo.isDirectory()) {
      const res = countLines(subPath, accountTowards)
      count += res.count
      files += res.files
      chars += res.chars
    } else if (entry.endsWith(".ts") || entry.endsWith(".tsx") || entry.endsWith("sass")) {
      const fileContent = readFileSync(subPath, "UTF-8")
      files++
      chars += fileContent.length
      count += fileContent.split("\n").length
    }
  }
  return {files, count, chars}
}
const directories = [projectDirectories.shared, projectDirectories.rn, projectDirectories.web, projectDirectories.ssr]

const result = []
for (const directory of directories) {
  result.push(countLines(resolve(directory, "src"), directory))
}

console.log("LINES ARE", result)
