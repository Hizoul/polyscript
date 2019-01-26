import { FormStore } from "@xpfw/form-shared";
import { DbStore, IFormShowProps, SharedFormShow } from "@xpfw/ui-shared"
import val from "isofw-shared/src/globals/val"
import * as React from "react"
import { ComponentBase } from "resub";

export interface PresetOverviewState {
  list: any
  groupBy: boolean
  showEmpty: boolean
}

export interface PresetOverviewProps extends PresetOverviewState {
}

const GROUP_BY_KEY = "groupBy"
const SHOW_EMPTY_KEY = "showEmpty"

const sharedPresetOverview = (Container: React.ComponentType<PresetOverviewProps>) => {
  return class extends ComponentBase<any, PresetOverviewState> {
    constructor(props: any) {
      super(props)
    }
    public render() {
      return (
        <Container
          {...this.props}
          {...this.state}
        />
      )
    }
    protected _buildState(props: any, initialBuild: boolean): PresetOverviewState {
      const list = DbStore.getGetState(" doesn't matter ", val.service.presetAssistant, true)
      const groupBy = FormStore.getValue(GROUP_BY_KEY)
      const showEmpty = FormStore.getValue(SHOW_EMPTY_KEY)
      return {
        list, groupBy, showEmpty
      }
    }
  }
}

export default sharedPresetOverview
