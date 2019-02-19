import useActiveSetter from "isofw-shared/src/components/project/activeSetter"
import * as React from "react"
import WebButton from "../button"

class ActiveButton extends React.Component<{id: string}, any> {
  public render() {
    const activeSetter = useActiveSetter(this.props.id)
    const props = this.props
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
      this.$f7.dialog.confirm(
        "This action will release all associated presets of this project! Are you sure you want to continue?",
        "Confirm", () => {
          activeSetter.toggleActive()
      })
    }
  }
}

export default ActiveButton
