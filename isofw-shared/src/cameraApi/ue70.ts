import cameraApi from "./index"

export interface IPresetData {
  pan: string
  tilt: string
  zoom: string
  focus: string
  iris?: string
}

const getPresetDataUE70 = async (cameraIp: string) => {
  let panTilt = await cameraApi.getPanTilt(cameraIp)
  panTilt = panTilt.substring(3)
  const pan = panTilt.substring(0, 4)
  const tilt = panTilt.substring(4)
  const zoom = await cameraApi.getZoom(cameraIp)
  const focus = await cameraApi.getFocus(cameraIp)
  const iris = await cameraApi.getIris(cameraIp)
  return {
    pan,
    tilt,
    zoom: zoom.substring(2),
    focus: focus.substring(2),
    iris: iris.substring(2)
  }
}

export {
  getPresetDataUE70
}
