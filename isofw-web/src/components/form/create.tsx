import { SharedField } from "@xpfw/form-shared"
import { IFormCreateProps, ISharedFormCreate, SharedFormCreate } from "@xpfw/ui-shared"
import {  IField } from "@xpfw/validate"
import { Block, BlockTitle, Button, List } from "framework7-react"
import { get } from "lodash"
import * as React from "react"
import WebButton from "../button"

class Framework7Create extends React.Component<IFormCreateProps, any> {
  public render() {
    const fields = this.props.fields.map((field: IField) => {
      return <SharedField key={field.mapTo} field={field} prefix={this.props.prefix} user={this.props.user} />
    })
    const gotErr = get(this.props, "error.errors.length", 0)
    const result = get(this.props, "state.result")
    let msg: any
    if (gotErr) {
      msg = (
        <div>
          <BlockTitle>Error</BlockTitle>
          <Block strong={true} inset={true}>
            <p>please recheck your inputs or connection {JSON.stringify(get(this.props, "error"))}</p>
          </Block>
        </div>
      )
    }
    if (result) {
      msg = (
        <div>
          <BlockTitle>Success</BlockTitle>
          <Block strong={true} inset={true}>
            <p>created {get(result, get(this.props.form, "options.idPath", "_id"))}</p>
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
        <WebButton onClick={this.props.submitCreate} iconFa="plus" fill={true} loading={this.props.loading} text="Create" />
        {msg}
      </div>
    )
  }
}

const WrappedFramework7Create: React.ComponentType<ISharedFormCreate> = SharedFormCreate<{}>(Framework7Create)
export default WrappedFramework7Create
