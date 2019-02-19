
import val from "isofw-shared/src/globals/val"
import { CameraForm } from "isofw-shared/src/xpfwDefs/camera"
import { PresetForm } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import UserForm from "isofw-shared/src/xpfwDefs/user"

const getForm = (collection: string) => {
  switch (collection) {
    case val.service.camera: return CameraForm
    case val.service.preset: return PresetForm
    case val.service.project: return ProjectForm
    case val.service.user: return UserForm
    default: return undefined
  }
}

export default getForm
