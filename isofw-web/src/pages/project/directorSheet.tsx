import { registerComponents as rg} from "@xpfw/form-web"
rg()
import { registerComponents } from "@xpfw/form-bulma"
registerComponents()
import { BulmaEdit, registerComponents as uiComponents } from "@xpfw/ui-bulma"
uiComponents()
import ValidationRegistry from "@xpfw/validate"
import { get } from "lodash"
import * as React from "react"
import "isofw-web/src/customizedBulma.sass"
import { SharedFormEdit, IFormEditProps, DbStore } from "@xpfw/ui-shared";
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project";
import WebPageContainer from "isofw-web/src/components/pageContainer";
import LoadingPage from "isofw-web/src/components/loading";
import WebButton from "isofw-web/src/components/button";
import { FormStore } from "@xpfw/form-shared";

const increaseTruckNumber = (thisRef: any) => {
    return async () => {
        const currentValue = FormStore.getValue(`shotEdit.${ProjectShot.mapTo}`)
        FormStore.setValue(`shotEdit.${ProjectShot.mapTo}`, Number(currentValue) + 1)
        await DbStore.patch(thisRef.props.id, ProjectForm, "shotEdit")
    }
}
class DirectorComponent extends React.Component<IFormEditProps, any> {
    private increase: any
    public constructor(props: any) {
        super(props)
        this.increase = increaseTruckNumber(this)
    }
    public render() {
        console.log( this.props )
        return (
          <div>
              Editing page
              {this.props.loading ? <LoadingPage /> : null}
              Shop number is: {get(this.props, "original.result.shot") }
              <WebButton
               text={" change "}
               onClick={this.increase}
              />
          </div>
        )
    }
  }
  
const WrappedDirectorComponent = SharedFormEdit<{}>(DirectorComponent)
const DirectorSheetPage: React.FunctionComponent<any> = (props) => {
  const id = get(props, "match.params.id")
  return (
    <WebPageContainer requireLoggedIn={true}>
      <WrappedDirectorComponent form={ProjectForm} id={id} resetState={true} prefix="shotEdit" />
    </WebPageContainer>
  )
}

export default DirectorSheetPage
