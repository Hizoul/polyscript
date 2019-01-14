import { registerComponents as rg} from "@xpfw/form-web"
rg()
import { registerComponents } from "@xpfw/form-bulma"
registerComponents()
import { registerComponents as uiComponents } from "@xpfw/ui-bulma"
uiComponents()
import { get } from "lodash"
import * as React from "react"
import "isofw-web/src/customizedBulma.sass"
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project";
import WebPageContainer from "isofw-web/src/components/pageContainer";
import ShotEditor from "isofw-web/src/components/project/shotEditor";

const DirectorSheetPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "id")
  return (
    <WebPageContainer requireLoggedIn={true} name="directorSheet" title="Director">
      <ShotEditor form={ProjectForm} id={id} resetState={true} prefix="shotEdit" />
    </WebPageContainer>
  )
}

export default DirectorSheetPage
