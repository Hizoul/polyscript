import { executeForMethods } from "@xpfw/form/dist";
import { cloneDeep } from "lodash"

const valToRegex = (val: any) => {
  if (val == null || val.length === 0) {
    return undefined
  }
  return {
    $regex: `(.*?)${val}(.*?)`,
    $options: "isg"
  }
}

const changeValToRegex = (path: string) => {
  return (value: any) => {
    if (value[path] != null) {
      const newValue = cloneDeep(value)
      newValue[path] = valToRegex(newValue[path])
      return newValue
    }
    return value
  }
}
const valToRegexNedb = (val: any) => {
  if (val == null || val.length === 0) {
    return undefined
  }
  return {
    $regex: new RegExp(`(.*?)${val}(.*?)`, "ig")
  }
}

const changeValToRegexNedb = (path: string, methods?: string[]) => {
  return executeForMethods((value: any) => {
    if (value[path] != null) {
      const newValue = cloneDeep(value)
      newValue[path] = valToRegexNedb(newValue[path])
      return newValue
    }
    return value
  }, methods)
}

export default valToRegex
export {
  changeValToRegex, changeValToRegexNedb
}
