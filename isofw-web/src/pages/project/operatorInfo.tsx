import { List } from "framework7-react"
import { prependPrefix } from "isofw-shared/src/util/xpfwform"
import { ProjectForm, ProjectShot, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import "isofw-web/src/components/form"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import OperatorInfo from "isofw-web/src/components/project/operatorInfo"
import CameraChooser from "isofw-web/src/components/project/programEditor/cameraChooser"
import { get } from "lodash"
import * as React from "react"
const OperatorInfoPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <WebPageContainer
      backLink={true}
      requireLoggedIn={true}
      name="operatorInfo"
      title="Operator info's"
      rightContent={<CameraChooser schema={ShotCamera} prefix={prependPrefix(ProjectForm.title, "edit")} inHeader={true} />}
    >
      <OperatorInfo schema={{}} id={id} prefix="edit" />
    </WebPageContainer>
  )
}

export default OperatorInfoPage
