import { DbStore, useGet } from "@xpfw/data"
import val from "isofw-shared/src/globals/val"
import { memo } from "isofw-shared/src/util/xpfwform"
import { IsActiveField } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"

const toggleActive = (id: string) => {
  return async (newValue?: any) => {
    await DbStore.getFromServer(id, val.service.presetAssistant)
  }
}

const useActiveSetter = (id: string) => {
  const itemHelper = useGet(id, val.service.project)
  return {
    ...itemHelper,
    toggleActive: memo(() => toggleActive(id), ["presetActiveToggler", id]),
    isActive: get(itemHelper.item, String(IsActiveField.title), false)
  }
}

export default useActiveSetter
export { toggleActive }
