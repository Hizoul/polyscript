import { Hook } from "@feathersjs/feathers"
import { performance } from "perf_hooks"

const stampHook = (stampAt: string) => {
  const retHook: Hook = (hook) => {
    hook.params[stampAt] = Date.now()
    return hook
  }
  return retHook
}
const perfHook = (stampAt: string) => {
  const retHook: Hook = (hook) => {
    hook.params[stampAt] = performance.now()
    return hook
  }
  return retHook
}
const perfDiff = (stampAt: string, against: string) => {
  const retHook: Hook = (hook) => {
    hook.params[stampAt] = performance.now() - hook.params[against]
    return hook
  }
  return retHook
}
const paramToResult = (stampAt: string) => {
  const retHook: Hook = (hook) => {
    hook.result[stampAt] = hook.params[stampAt]
    return hook
  }
  return retHook
}

export {
  stampHook,
  paramToResult,
  perfHook, perfDiff
}
