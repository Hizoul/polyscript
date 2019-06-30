import console = require("console")
import { DbStore, toJS, useEdit } from "isofw-shared/src/util/xpfwdata"
import { FormStore, memo, prependPrefix, useField } from "isofw-shared/src/util/xpfwform"
import { ProjectForm, ProjectProgram, ProjectShot } from "isofw-shared/src/xpfwDefs/project"

const directorPrefix = "edit"
const customNumberField = "seperateShotField"

const schema = ProjectForm
const increaseShotNumber = (id: string, decrease?: boolean) => {
    return async () => {
      const valueHelper = useField(String(ProjectShot.title), prependPrefix(ProjectForm.title, directorPrefix))
      const programSize = FormStore.getValue(ProjectProgram.title, prependPrefix(ProjectForm.title, directorPrefix), [])
      // 0 < newval < programSize.lenth - 1
      const newValue = valueHelper.value + (decrease ? -1 : 1)
      valueHelper.setValue(Math.max(0, Math.min(newValue, Math.max(0, programSize.length - 1))))
      const res = await DbStore.patch(id, ProjectForm, undefined, directorPrefix)
      return res
    }
}
const setTo = (id: string) => {
    return async () => {
      const valueHelper = useField(String(ProjectShot.title), prependPrefix(ProjectForm.title, directorPrefix))
      const newNum = FormStore.getValue(customNumberField, directorPrefix, 2)
      valueHelper.setValue(newNum - 1)
      const res = await DbStore.patch(id, ProjectForm, undefined, directorPrefix)
      return res
    }
}

const useDirector = (id: string) => {
  const directorEdit = useEdit(id, schema, undefined, directorPrefix)
  if (FormStore.getValue(customNumberField, directorPrefix) == null && directorEdit.original != null) {
    FormStore.setValue(customNumberField, directorEdit.original.shot + 1, directorPrefix)
  }
  return {
    ...directorEdit,
    increase: memo(() => increaseShotNumber(id, false), ["increaser", id, false]),
    decrease: memo(() => increaseShotNumber(id, true), ["increaser", id, true]),
    setTo: memo(() => setTo(id), [customNumberField, id]),
    numField: {
      title: customNumberField,
      type: "number"
    }
  }
}

export interface DirectorProps {id: string, prefix?: string}

export default useDirector
export {
  increaseShotNumber, directorPrefix
}
