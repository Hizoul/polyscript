import NativePageContained from "isofwrn/src/components/pageContainer"
import NativeSettingsComponent from "isofwrn/src/components/settings"
import * as React from "react"

const SettingsPage: React.FunctionComponent<any> = (props) => {
  return (
    <NativePageContained {...props} title="Settings" requireLoggedIn={true}>
      <NativeSettingsComponent />
    </NativePageContained>
  )
}

export default SettingsPage
