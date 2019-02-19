import { DbStore } from "@xpfw/data"
import { FormStore } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"

const GROUP_BY_KEY = "groupBy"
const SHOW_EMPTY_KEY = "showEmpty"

const usePresetOverview = () => {
  const list = DbStore.getGetState(" doesn't matter ", val.service.presetAssistant, true)
  const groupBy = FormStore.getValue(GROUP_BY_KEY)
  const showEmpty = FormStore.getValue(SHOW_EMPTY_KEY)
  return {
    list, groupBy, showEmpty
  }
}

export default usePresetOverview
