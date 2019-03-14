import { Application, Hook, HookContext } from "@feathersjs/feathers"
import console = require("console")
import val from "isofw-shared/src/globals/val"
import { ProjectProgram, ShotNumber } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"

const fixProjectShots = async (hook: HookContext, app: Application, project: any) => {
  const program = get(project, ProjectProgram.title)
  let needToPushFix = false
  if (program != null && Array.isArray(program)) {
    for (let i = 0; i < program.length; i++) {
      const programEntry = program[i]
      const newNumber = i + 1
      if (programEntry != null) {
        if (programEntry[String(ShotNumber.title)] !== newNumber) {
          needToPushFix = true
          programEntry[String(ShotNumber.title)] = newNumber
        }
      }
    }
    project[String(ProjectProgram.title)] = program
    if (needToPushFix) {
      hook.result = await app.service(val.service.project).update(get(project, "_id", "undefined"), project)
    }
  }
}

const ensureShotNumber: Hook = async (hook) => {
  await fixProjectShots(hook, hook.app, hook.result)
  return hook
}

export default ensureShotNumber
