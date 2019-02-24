import { DbStore, toJS, useEdit } from "isofw-shared/src/util/xpfwdata"
import { FormStore, memo, prependPrefix, useField } from "isofw-shared/src/util/xpfwform"
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project"

const directorPrefix = "edit"
const schema = ProjectForm
const increaseShotNumber = (id: string, decrease?: boolean) => {
    return async () => {
      const valueHelper = useField(String(ProjectShot.title), prependPrefix(ProjectForm.title, directorPrefix))
      valueHelper.setValue(valueHelper.value + (decrease ? -1 : 1))
      return DbStore.patch(id, ProjectForm, undefined, directorPrefix)
    }
}

const useDirector = (id: string) => {
  const directorEdit = useEdit(id, schema, undefined, directorPrefix)
  return {
    ...directorEdit,
    increase: memo(() => increaseShotNumber(id, false), ["increaser", id, false]),
    decrease: memo(() => increaseShotNumber(id, true), ["increaser", id, true])
  }
}

export interface DirectorProps {id: string, prefix?: string}

export default useDirector
export {
  increaseShotNumber, directorPrefix
}
