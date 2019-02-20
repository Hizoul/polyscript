
import { useRelationship } from "isofw-shared/src/util/xpfwdata"
import { IFieldProps } from "isofw-shared/src/util/xpfwform"
import { isNil } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import NativeFieldContainer from "./field"
import NativeRelationshipItem from "./relationshipItem"
import NativeRelationshipSearch from "./relationshipSearch"

const NativeRelationshipSingleField: React.FunctionComponent<IFieldProps> = observer((props) => {
  const relationHelper = useRelationship(props.schema, props.mapTo, props.prefix)
  let content
  if (!isNil(relationHelper.value)) {
    const obj = relationHelper.relatedObject
    content = (
      <NativeRelationshipItem
        schema={props.schema}
        item={obj}
        addId={relationHelper.addId}
        removeId={relationHelper.removeId}
        isAdd={false}
      />
    )
  } else {
    content = (
      <NativeRelationshipSearch
        {...relationHelper}
        {...props}
      />
    )
  }
  return (
    <NativeFieldContainer {...props}>
      {content}
    </NativeFieldContainer>
  )
})

export default NativeRelationshipSingleField
