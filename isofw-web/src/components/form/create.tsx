import { Block, BlockTitle, List } from "framework7-react"
import { dataOptions, ICreateHookProps, useCreateWithProps } from "isofw-shared/src/util/xpfwdata"
import { getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import WebButton from "../button"

const Frameowrk7Create: React.FunctionComponent<ICreateHookProps> = observer((props) => {
  const createProps = useCreateWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(<SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = createProps.error != null
  const result = createProps.state
  let msg: any
  if (gotErr) {
    msg = (
      <div>
        <BlockTitle>Error</BlockTitle>
        <Block strong={true} inset={true}>
          <p>please recheck your inputs or connection {JSON.stringify(createProps.error)}</p>
        </Block>
      </div>
    )
  }
  if (result != null) {
    msg = (
      <div>
        <BlockTitle>Success</BlockTitle>
        <Block strong={true} inset={true}>
          <p>created {get(result, dataOptions.idPath)}</p>
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
        onClick={createProps.submitCreate}
        iconFa="plus"
        fill={true}
        loading={createProps.loading}
        text="Create"
      />
      {msg}
    </div>
  )
})

export default Frameowrk7Create
