import { Application, Hook } from "@feathersjs/feathers"
import { cameraCommand } from "isofw-shared/src/cameraApi"
import val from "isofw-shared/src/globals/val"
import { PresetActionTypeField, PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectCameras, ProjectProgram, ProjectShot, ShotCamera, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"

const camerasPreset: {[index: string]: string | undefined} = {}

const activateNextPrestsOfProject = async (project: any, app: Application) => {
  const program = get(project, String(ProjectProgram.title), [])
  const currentShot = get(project, String(ProjectShot.title), 0)
  const cameras = get(project, String(ProjectCameras.title), [])
  if (program != null) {
    for (const camera of cameras) {
      cameraShot: for (let i = currentShot; i < program.length; i++) {
        if (program[i] != null && program[i][String(ShotCamera.title)] === camera) {
          const presetToGoTo = program[i][String(ShotPreset.title)]
          if (camerasPreset[camera] !== presetToGoTo) {
            camerasPreset[camera] = presetToGoTo
            try {
              const preset = await app.service(val.service.preset).get(presetToGoTo)
              await app.service(val.service.presetAssistant).patch(camera, {
                [String(PresetNumberField.title)]: preset[String(PresetNumberField.title)],
                [String(PresetActionTypeField.title)]: cameraCommand.goToPreset
              })
            } catch (e) {}
          }
          break cameraShot
        }
      }
    }
  }
}

const activateNextPresets: Hook = async (hook) => {
  activateNextPrestsOfProject(hook.result, hook.app)
  return hook
}

export default activateNextPresets
