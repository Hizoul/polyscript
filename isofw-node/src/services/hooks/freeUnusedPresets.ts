import { Application, Hook } from "@feathersjs/feathers"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { EMPTY_PRESET, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectProgram, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"

const freePresetsOfProject = async (app: Application, projectId: any) => {
  const project = await app.service(val.service.project).get(projectId, isServerParams)
  const presetIdsInUse = []
  for (const programItem of get(project, ProjectProgram.mapTo, [])) {
    const id = programItem[ShotPreset.mapTo]
    if (id) {
      presetIdsInUse.push(id)
    }
  }
  const presets = await app.service(val.service.preset).find({
    ...isServerParams, query: {
      $limit: val.maximumPresetAmount,
      [PresetProjectField.mapTo]: projectId,
      _id: {$nin: presetIdsInUse}
    }
  })
  for (const preset of presets.data) {
    console.log("Freeing up unused preset", preset._id)
    await app.service(val.service.preset).patch(preset._id, {
      [PresetProjectField.mapTo]: EMPTY_PRESET
    }, isServerParams)
  }
}

const freeUnusedPresets: Hook = async (hook) => {
  await freePresetsOfProject(hook.app, hook.id)
  return hook
}

export default freeUnusedPresets
