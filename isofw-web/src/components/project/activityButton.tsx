import SharedActiveSetter, { SharedActiveSetterProps } from "isofw-shared/src/components/project/activeSetter"
import * as React from "react"
import WebButton from "../button"

class ActiveButton extends React.Component<SharedActiveSetterProps, any> {
  public render() {
    console.log(" law ", this.$f7)
    const props = this.props
    return (
      <WebButton
        text={props.isActive ? "Deactivate" : "Re-activate"}
        iconFa="step-backward"
        onClick={() => this.askActivation()}
        loading={props.loading}
      />
    )
  }
  private askActivation() {
    console.log("THIS IS", this.$f7)
    if (this.$f7 != null) {
      this.$f7.dialog.confirm(
        "This action will release all associated presets of this project! Are you sure you want to continue?",
        "Confirm", () => {
        this.props.toggleActive()
      })
    }
  }
}

export default SharedActiveSetter(ActiveButton)
