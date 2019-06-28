import { BlockTitle, Card, CardContent, CardFooter, CardHeader, Link } from "framework7-react"
import getPresetImgUrl from "isofw-shared/src/components/preset/getUrl"
import useOperatorInfo from "isofw-shared/src/components/project/operatorInfo"
import val from "isofw-shared/src/globals/val"
import { IEditHookProps, toJS, useGet } from "isofw-shared/src/util/xpfwdata"
import { CameraForm } from "isofw-shared/src/xpfwDefs/camera"
import { PresetForm, PresetNumberField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectName, ShotName } from "isofw-shared/src/xpfwDefs/project"
import I18n from "isofw-web/src/components/i18n"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import "../style.sass"
import "./style.sass"

const PresetItem: React.FunctionComponent<any> = observer((props) => {
  const preset = useGet(get(props.item, "preset"), String(PresetForm.collection))
  const camera = useGet(get(props.item, "camera"), String(CameraForm.collection))
  const imageUrl = getPresetImgUrl(preset.item)
  return (
    <Card>
      <CardHeader>
        <span>{get(props.item, String(ShotName.title))}</span>
        <span>{get(camera.item, String(ProjectName.title))} Preset {get(preset.item, String(PresetNumberField.title), 0) + 1}</span>
      </CardHeader>
      <CardContent padding={false}>
        {imageUrl ?
          <img src={imageUrl} style={{width: "100%"}} /> :
          <I18n text="noPreview" className="flex1 center verticalCenter" style={{minHeight: 50}} />}
      </CardContent>
    </Card>
  )
})

const PresetPrintView: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const operatorHelper = useOperatorInfo(props.id, props.mapTo, props.prefix)
  let i = 0
  return (
    <div className="flex1 column">
      <div className="printHeader">
        <div className="printHeaderContent">
          {operatorHelper.original ? operatorHelper.original[String(ProjectName.title)] : ""}
        </div>
      </div>
      <div className="printPresets">
        {operatorHelper.filteredList.map((item: any) => {
          i++
          if (operatorHelper.currentCameras.length > 0 &&
            operatorHelper.currentCameras.indexOf(item.camera) === -1) {return null}
          return <PresetItem item={item} key={item.camera} />
        })}
      </div>
    </div>
  )
})
export default PresetPrintView
