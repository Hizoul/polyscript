import { BlockTitle, Card, CardContent, CardFooter, CardHeader, Link } from "framework7-react"
import getPresetImgUrl from "isofw-shared/src/components/preset/getUrl"
import usePresetUpdater from "isofw-shared/src/components/preset/updater"
import val from "isofw-shared/src/globals/val"
import { PresetNumberField, PresetPreviewField } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import NameDisplayer from "isofw-web/src/components/displayName"
import I18n from "isofw-web/src/components/i18n"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"

const PresetCard: React.FunctionComponent<{id: string}> = observer((props) => {
  const presetUpdater = usePresetUpdater(props.id)
  const imageUrl = get(presetUpdater.item, String(PresetPreviewField.title))
  return (
    <Card>
      <CardHeader>
        <span>Preset #{get(presetUpdater.item, String(PresetNumberField.title), 0) + 1}</span>
      </CardHeader>
      <CardContent padding={false}>
        {imageUrl ?
          <img src={getPresetImgUrl(presetUpdater.item)} style={{width: "100%"}} /> :
          <I18n text="noPreview" className="flex1 center verticalCenter" style={{minHeight: 50}} />}
      </CardContent>
      <CardFooter>
        <Link
          text="Update"
          onClick={presetUpdater.savePreset}
        />
        <Link
          text={presetUpdater.isReady ? "un-ready" : "ready"}
          onClick={presetUpdater.isReady ? presetUpdater.setNotReady : presetUpdater.setReady}
        />
      </CardFooter>
    </Card>
  )
})

const CameraPresets: React.FunctionComponent<any> = (props) => {
  return (
    <div>
      <BlockTitle>
        <NameDisplayer
          collection={val.service.camera}
          id={get(props.item, "camera")}
          getNameFrom={String(ProjectName.title)}
          placeholder=""
        />
      </BlockTitle>
      <div className="presetCards">
        {get(props.item, "presets", []).map((preset: any) => <PresetCard key={preset} id={preset} />)}
      </div>
    </div>
  )
}

export default CameraPresets
export {
  PresetCard
}
