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
const directories = [projectDirectories.shared, projectDirectories.web, projectDirectories.rn,  projectDirectories.ssr]

const result = []
for (const directory of directories) {
  result.push(countLines(resolve(directory, "src"), directory))
}

console.log("LINES ARE", result)
let totalFiles = 0
let totalCount = 0
let totalChars = 0
let totalFilesWithServer = 0
let totalCountWithServer = 0
let totalCharsWithServer = 0
let i = 0
for (const res of result) {
  i++
  totalFilesWithServer += res.files
  totalCountWithServer += res.count
  totalCharsWithServer += res.chars
  if (i !== 4) {
    totalFiles += res.files
    totalCount += res.count
    totalChars += res.chars
  }
}

const percentOf = (amount: number, total: number) => {
  return ((amount / total) * 100).toFixed(2)
}

console.log(`Percentages Frontend:´
${percentOf(result[0].files, totalFiles)} Files,
${percentOf(result[0].count, totalCount)} Lines,
${percentOf(result[0].chars, totalChars)} Chars`)

console.log(`Percentages All:´
${percentOf(result[0].files, totalFilesWithServer)} Files,
${percentOf(result[0].count, totalCountWithServer)} Lines,
${percentOf(result[0].chars, totalCharsWithServer)} Chars`)
