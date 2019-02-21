import { Block, BlockTitle, List } from "framework7-react"
import { dataOptions, IEditHookProps, useEditWithProps, toJS } from "isofw-shared/src/util/xpfwdata"
import { getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebButton from "../button"

const Frameowrk7Edit: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const editProps = useEditWithProps(props)
  console.log("In edith with", toJS(editProps))
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(<SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = editProps.error != null
  const result = editProps.state
  let msg: any
  if (gotErr) {
    msg = (
      <div>
        <BlockTitle>Error</BlockTitle>
        <Block strong={true} inset={true}>
          <p>please recheck your inputs or connection {JSON.stringify(editProps.error)}</p>
        </Block>
      </div>
    )
  }
  if (result) {
    msg = (
      <div>
        <BlockTitle>Success</BlockTitle>
        <Block strong={true} inset={true}>
          <p>saved changes to {get(editProps.state, dataOptions.idPath)}</p>
        </Block>
      </div>
    )
  }
  return (
    <div>
      <List form={true} style={{margin: "0pt"}}>
        <ul>
          {fields}
        </ul>
      </List>
      <WebButton
        onClick={editProps.submitEdit}
        iconFa="save"
        fill={true}
        loading={editProps.loading}
        text="Save"
      />
      {msg}
    </div>
  )
})

export default Frameowrk7Edit
