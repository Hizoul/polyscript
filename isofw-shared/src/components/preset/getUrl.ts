import urls from "isofw-shared/src/globals/url"
import val from "isofw-shared/src/globals/val"
import { PresetPreviewField } from "isofw-shared/src/xpfwDefs/preset"
import { get } from "lodash"

const getPresetImgUrl = (preset: any) =>  {
  const imageUrl = get(preset, String(PresetPreviewField.title))
  if (imageUrl == null) { return undefined }
  return `${urls.webPrefix}${urls.mainServer}:${val.isDebug ? 4201 : urls.port}${urls.presetPreview}/${imageUrl}`
}

export default getPresetImgUrl
