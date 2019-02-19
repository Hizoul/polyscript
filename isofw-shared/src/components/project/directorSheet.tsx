import { DbStore, useEdit } from "isofw-shared/src/util/xpfwdata"
import { memo, prependPrefix, useField } from "isofw-shared/src/util/xpfwform"
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project"

const directorPrefix = "shotEdit"
const schema = ProjectForm
const increaseShotNumber = (id: string, decrease?: boolean) => {
    return async () => {
      const valueHelper = useField(String(ProjectShot.title), prependPrefix(ProjectForm.title, directorPrefix))
      valueHelper.setValue(Number(valueHelper.value) + (decrease ? -1 : 1))
      return DbStore.patch(id, ProjectForm, directorPrefix)
    }
}

const useDirector = (id: string, reset?: boolean) => {
  const directorEdit = useEdit(id, schema, undefined, directorPrefix, reset)
  return {
    ...directorEdit,
    increase: memo(increaseShotNumber(id, true), [id, true]),
    decrease: memo(increaseShotNumber(id, false), [id, false])
  }
}

export interface DirectorProps {id: string, reset?: boolean, prefix?: string}

export default useDirector
export {
  increaseShotNumber, directorPrefix
}
