import { Link, Icon } from "framework7-react"
import urls from "isofw-shared/src/globals/url"
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
  const rightContent = (
    <div className="flex row verticalCenter">
      <Link className="marginRight" href={`${urls.printScript}/${id}`}><Icon fa="print" /></Link>
      <CameraChooser schema={ShotCamera} prefix={prependPrefix(ProjectForm.title, "edit")} inHeader={true} />
    </div>
  )
  return (
    <WebPageContainer
      backLink={true}
      requireLoggedIn={true}
      name="operatorInfo"
      title="Operator info's"
      rightContent={rightContent}
    >
      <OperatorInfo schema={{}} id={id} prefix="edit" />
    </WebPageContainer>
  )
}

export default OperatorInfoPage
