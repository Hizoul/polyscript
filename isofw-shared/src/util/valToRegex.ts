import { cloneDeep } from "lodash"

const valToRegex = (val: any) => {
  if (val == null || val.length === 0) {
    return null
  }
  return {
    $regex: `(.*?)${val}(.*?)`,
    $options: "isg"
  }
}

const changeValToRegex = (path: string) => {
  return (value: any) => {
    const newValue = cloneDeep(value)
    if (newValue[path]) {
      newValue[path] = valToRegex(newValue[path])
    }
    return newValue
  }
}

export default valToRegex
export {
  changeValToRegex
}