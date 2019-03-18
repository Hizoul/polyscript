import urls from "./url"

const val = {
  isDebug: true,
  isNative: true,
  version: "0.1.0",
  i18nNameSpace: "main",
  channel: {
    realtime: "realtime"
  },
  service: {
    batch: "/batch",
    user: "/users",
    project: "projects",
    camera: "cameras",
    preset: "presets",
    presetAssistant: "presetAssistant",
    benchmarkResults: "benchmarkResults"
  },
  maximumPresetAmount: 100,
  handlePresetsSelf: false,
  network: {
    websocket: 0,
    tcp: 1,
    udp: 2,
    packetDelimiter: "_MSG_END_",
    addServerTimeInfo: false,
    addServerTimeInfoForWebSockets: false,
    benchmarkEnabled: false,
    networkToUse: 0
  },
  // can be set to an object with {url: string, params: any, navigated: false} so rn will go to the page after login
  navigateTo: {
    url: undefined,
    params: undefined,
    navigated: false
  }
}

export default val
