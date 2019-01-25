import { Hook } from "@feathersjs/feathers"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import { EMPTY_PRESET, PresetCameraField,
  PresetNumberField, PresetProjectField } from "isofw-shared/src/xpfwDefs/preset"

const presetCreator: Hook = async (hook) => {
  const cameraId = hook.result._id.toHexString()
  console.log(" created camera with ID ",  cameraId)
  for (let index = 0; index < val.maximumPresetAmount; index++) {
    const presetId = `${cameraId.substring(0, cameraId.length - String(index).length - 5)}${index}98765`
    hook.app.service(val.service.preset).create({
      _id: presetId,
      [PresetNumberField.mapTo]: index,
      [PresetCameraField.mapTo]: cameraId,
      [PresetProjectField.mapTo]: EMPTY_PRESET
    }, isServerParams)
  }
  return hook
}

export default presetCreator
