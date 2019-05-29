import useActiveSetter from "isofw-shared/src/components/project/activeSetter"
import { observer } from "mobx-react"
import * as React from "react"
import WebButton from "../button"

@observer class ActiveButton extends React.Component<{id: string}, any> {
  public render() {
    const activeSetter = useActiveSetter(this.props.id)
    return (
      <WebButton
        text={activeSetter.isActive ? "Deactivate" : "Re-activate"}
        iconFa="step-backward"
        onClick={() => this.askActivation()}
        loading={activeSetter.loading}
      />
    )
  }
  private askActivation() {
    if (this.$f7 != null) {
      const activeSetter = useActiveSetter(this.props.id)
      if (activeSetter.isActive) {
        this.$f7.dialog.confirm(
          "This action will release all associated presets of this project! Are you sure you want to continue?",
          "Confirm", () => {
            activeSetter.toggleActive()
        })
      } else {
        activeSetter.toggleActive()
      }
    }
  }
}

export default ActiveButton
