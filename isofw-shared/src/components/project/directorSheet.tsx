import * as React from "react"
import "isofw-web/src/customizedBulma.sass"
import { SharedFormEdit, IFormEditProps, DbStore } from "@xpfw/ui-shared";
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project";
import { FormStore } from "@xpfw/form-shared";

const increaseTruckNumber = (thisRef: any) => {
    return async () => {
        const currentValue = FormStore.getValue(`shotEdit.${ProjectShot.mapTo}`)
        FormStore.setValue(`shotEdit.${ProjectShot.mapTo}`, Number(currentValue) + 1)
        await DbStore.patch(thisRef.props.id, ProjectForm, "shotEdit")
    }
}
export interface DirectorComponentProps extends IFormEditProps {
    increase: any
}
const sharedDirectorComponent = (Component: React.ComponentType<DirectorComponentProps>) => {
    class DirectorComponent extends React.Component<IFormEditProps, any> {
        private increase: any
        public constructor(props: any) {
            super(props)
            this.increase = increaseTruckNumber(this)
        }
        public render() {
            return (
              <Component {...this.props} {...this.state} increase={this.increase} />
            )
        }
      }
      
    const WrappedDirectorComponent = SharedFormEdit<{}>(DirectorComponent)
    return WrappedDirectorComponent
}

export default sharedDirectorComponent
