import { IFieldProps, SharedField, useObject } from "isofw-shared/src/util/xpfwform"
import { observer } from "mobx-react-lite";
import * as React from "react"
import { View } from "react-native"

const ObjectField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const objectHelper = useObject(props.schema, props.mapTo, props.prefix)
  return (
    <View>
      {objectHelper.fields.map((subField) => <SharedField {...subField} key={subField.mapTo} />)}
    </View>
  )
})

export default ObjectField
