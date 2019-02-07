import "isomorphic-fetch"
import { stringify } from "query-string"

const cameraCommand = {
  goToPreset: 2,
  updatePreset: 3,
  startZoom: 4,
  stopZoom: 5
}

const ue70handler = {
  commandPath: "/cgi-bin/aw_ptz",
  commandEscape: "%23",
  updatePreset: "M",
  goToPreset: "R",
  zoom: "Z",
  additionalCommands: {
    res: 1
  }
}

const cameraApi = {
  goToPreset: async (cameraIp: string, presetNumber: number) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.goToPreset}${presetNumber}`
    })
    console.log(" about to fetch ", `${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  updatePreset: async (cameraIp: string, presetNumber: number) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.updatePreset}${presetNumber}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  startZoom: async (cameraIp: string) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.zoom}`
    })
    const toBeFetched = await fetch(`${cameraIp}${ue70handler.commandPath}?${requestParameters}`)
    const result = await toBeFetched.text()
    return result
  },
  stopZoom: async (cameraIp: string) => {
    const requestParameters = stringify({
      ...ue70handler.additionalCommands,
      cmd: `${ue70handler.zoom}`
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
