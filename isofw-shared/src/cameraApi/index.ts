import "isomorphic-fetch"
import { stringify } from "query-string"

const cameraCommand = {
  goToPreset: 2,
  updatePreset: 3,
  doZoom: 4,
  doPanTilt: 5,
  zoomToPoint: 6,
  getZoom: 7,
  getFocus: 8,
  getIris: 9,
  focusToPoint: 10,
  irisToPoint: 11,
  getPanTilt: 12
}

const ue70handler = {
  commandPath: "/cgi-bin/aw_ptz",
  commandEscape: "#",
  updatePreset: "M",
  goToPreset: "R",
  zoom: "Z",
  panTilt: "APC",
  pan: "P",
  tilt: "T",
  zoomToPoint: "AXZ",
  getZoom: "GZ",
  getFocus: "GF",
  getIris: "GI",
  focusToPoint: "AXF",
  irisToPoint: "AXI",
  mjpegStream: "/cgi-bin/mjpeg?resolution=1920x1080&quality=1",
  additionalCommands: {
    res: 1
  }
}

const numberConverter = (presetNumber: number) => {
  if (presetNumber < 10) {
    return `0${presetNumber}`
  }
  return presetNumber
}

const cameraApi = {
  goToPreset: async (cameraIp: string, presetNumber: number) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.goToPreset}${numberConverter(presetNumber)}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  updatePreset: async (cameraIp: string, presetNumber: number) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.updatePreset}${numberConverter(presetNumber)}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  doZoom: async (cameraIp: string, zoomSpeed: number) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.zoom}${numberConverter(zoomSpeed)}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  doPan: async (cameraIp: string, zoomSpeed: number) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.pan}${numberConverter(zoomSpeed)}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  doTilt: async (cameraIp: string, zoomSpeed: number) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.tilt}${numberConverter(zoomSpeed)}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  /** pan: value between -175 and 175; tilt: value betwwen -30 and 210 */
  doPanTiltToPosition: async (cameraIp: string, pan: any, tilt: any) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.panTilt}${pan}${tilt}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  /** pan: value between -175 and 175; tilt: value betwwen -30 and 210 */
  doZoomToPosition: async (cameraIp: string, zoomPoint: any) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.zoomToPoint}${zoomPoint}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  /** pan: value between -175 and 175; tilt: value betwwen -30 and 210 */
  doFocusToPosition: async (cameraIp: string, focusPoint: any) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.focusToPoint}${focusPoint}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  /** pan: value between -175 and 175; tilt: value betwwen -30 and 210 */
  doIrisToPosition: async (cameraIp: string, irisPoint: any) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.irisToPoint}${irisPoint}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  /** pan: value between -175 and 175; tilt: value between -30 and 210 */
  getPanTilt: async (cameraIp: string) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.panTilt}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  /** pan: value between -175 and 175; tilt: value betwwen -30 and 210 */
  getZoom: async (cameraIp: string) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.getZoom}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  /** pan: value between -175 and 175; tilt: value betwwen -30 and 210 */
  getFocus: async (cameraIp: string) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.getFocus}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  /** pan: value between -175 and 175; tilt: value betwwen -30 and 210 */
  getIris: async (cameraIp: string) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.commandEscape}${ue70handler.getIris}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  }
}

export default cameraApi
export {
  cameraCommand
}
