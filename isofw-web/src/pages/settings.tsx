import WebPageContainer from "isofw-web/src/components/pageContainer"
import SettingsComponent from "isofw-web/src/components/settings"
import * as React from "react"

const SettingsPage: React.FunctionComponent<any> = (props) => {
  return (
    <WebPageContainer {...props} name="settings" title="Settings">
      <SettingsComponent />
    </WebPageContainer>
  )
}

export default SettingsPage
