import { IFieldProps, SharedField } from "isofw-shared/src/util/xpfwformshared"
import { globals, IField } from "isofw-shared/src/util/xpfwvalidate"
import { cloneDeep, each, get } from "lodash"
import * as React from "react"
import { View } from "react-native"

class ObjectField extends React.Component<IFieldProps, any> {
  public render() {
    const children: any = []
    const objectDef = get(this.props.field, `validate.objectDef`)
    if (Array.isArray(objectDef)) {
      each(objectDef, (subFieldOptions: IField) => {
        const subField = cloneDeep(subFieldOptions)
        subField.mapTo = `${this.props.field.mapTo}.${subFieldOptions.mapTo}`
        children.push(<SharedField prefix={this.props.prefix} field={subField} />)
      })
    }
    return (
      <View>
        {children}
      </View>
    )
  }
}

export default ObjectField
