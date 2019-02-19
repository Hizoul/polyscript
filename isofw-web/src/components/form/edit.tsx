import { Block, BlockTitle, List } from "framework7-react"
import { dataOptions, IEditHookProps, useEditWithProps } from "isofw-shared/src/util/xpfwdata"
import { iterateSubFields, SharedField } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import * as React from "react"
import WebButton from "../button"

const Frameowrk7Edit: React.FunctionComponent<IEditHookProps> = (props) => {
  const editProps = useEditWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(<SharedField key={key} schema={schema} prefix={props.prefix} />)
  })
  const gotErr = editProps != null
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
}

export default Frameowrk7Edit
