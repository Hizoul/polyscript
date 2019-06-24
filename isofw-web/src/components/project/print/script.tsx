import useOperatorInfo from "isofw-shared/src/components/project/operatorInfo"
import val from "isofw-shared/src/globals/val"
import { IEditHookProps } from "isofw-shared/src/util/xpfwdata"
import { PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectName, ShotCamera, ShotName, ShotNumber, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import I18n from "isofw-web/src/components/i18n"
import { observer } from "mobx-react-lite"
import * as React from "react"
import "../style.sass"
import "./style.sass"

const ShotItem = (props: any) => {
  return (
    <div className="printRow">
      <span>{props.item[String(ShotNumber.title)]}</span>
      <NameDisplayer
        collection={val.service.camera}
        id={props.item[String(ShotCamera.title)]}
        getNameFrom={String(ProjectName.title)}
        placeholder=""
        className="bigger"
      />
      <span className="bigEntry stylizedBorder bigger">{props.item[String(ShotName.title)]}</span>
      <NameDisplayer
        collection={val.service.preset}
        id={props.item[String(ShotPreset.title)]}
        getNameFrom={String(PresetNumberField.title)}
        placeholder=""
      />
    </div>
  )
}

const ScriptPrintView: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const operatorHelper = useOperatorInfo(props.id, props.mapTo, props.prefix)
  return (
    <div className="flex1 column">
      <div className="printHeader">
        <div className="printHeaderContent">
          {operatorHelper.original ? operatorHelper.original[String(ProjectName.title)] : ""}
        </div>
      </div>
      <div className="printTitle">
        <I18n text="operator.table.shot" />
        <I18n text="operator.table.camera" />
        <I18n text="operator.table.description" className="bigEntry" />
        <I18n text="operator.table.preset" />
      </div>
      {operatorHelper.filteredList.map((item: any, i: number) => {
        i++
        return <ShotItem item={item} key={i} currentShot={operatorHelper.currentShot} />
      })}
    </div>
  )
})
export default ScriptPrintView
