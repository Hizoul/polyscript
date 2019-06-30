import { Application, Hook } from "@feathersjs/feathers"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { EMPTY_PRESET, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"

const freePresetsOfProject = async (app: Application, projectId: any, deleteAll?: boolean) => {
  const presetIdsInUse = []
  if (!deleteAll) {
    const project = await app.service(val.service.project).get(projectId, isServerParams)
    let projectProgram = get(project, String(ProjectProgram.title), [])
    if (projectProgram == null) {
      projectProgram = []
    }
    for (const programItem of projectProgram) {
      if (programItem != null) {
        const id = programItem[String(ShotPreset.title)]
        if (id) {
          presetIdsInUse.push(id)
        }
      }
    }
  }
  const presets = await app.service(val.service.preset).find({
    ...isServerParams, query: {
      $limit: val.maximumPresetAmount,
      [String(PresetProjectField.title)]: projectId,
      _id: {$nin: presetIdsInUse}
    }
  })
  for (const preset of presets.data) {
    console.log("Freeing up unused preset", preset._id)
    await app.service(val.service.preset).patch(preset._id, {
      [String(PresetProjectField.title)]: EMPTY_PRESET
    }, isServerParams)
  }
}

const freeUnusedPresets: Hook = async (hook) => {
  await freePresetsOfProject(hook.app, hook.id)
  return hook
}

export default freeUnusedPresets
export {
  freePresetsOfProject
}
