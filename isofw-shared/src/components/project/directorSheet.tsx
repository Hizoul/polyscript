import { FormStore } from "isofw-shared/src/util/xpfwformshared"
import { DbStore, IFormEditProps, SharedFormEdit } from "isofw-shared/src/util/xpfwuishared"
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"

const directorPrefix = "shotEdit"

const increaseShotNumber = (thisRef: any, decrease?: boolean) => {
    return async () => {
        const currentValue = FormStore.getValue(`${directorPrefix}.${ProjectShot.mapTo}`)
        FormStore.setValue(`${directorPrefix}.${ProjectShot.mapTo}`, Number(currentValue) + (decrease ? -1 : 1))
        return DbStore.patch(thisRef.props.id, ProjectForm, directorPrefix)
    }
}
export interface DirectorComponentProps extends IFormEditProps {
  decrease: any
  increase: any
}
const sharedDirectorComponent = (Component: React.ComponentType<DirectorComponentProps>) => {
    class DirectorComponent extends React.Component<IFormEditProps, any> {
      private increase: any
      private decrease: any
      public constructor(props: any) {
          super(props)
          this.increase = increaseShotNumber(this)
          this.decrease = increaseShotNumber(this, true)
      }
      public render() {
          return (
            <Component
              {...this.props}
              {...this.state}
              increase={this.increase}
              decrease={this.decrease}
            />
          )
      }
    }
    const WrappedDirectorComponent = SharedFormEdit<{}>(DirectorComponent)
    return WrappedDirectorComponent
}

export default sharedDirectorComponent
export {
  increaseShotNumber, directorPrefix
}
