import * as React from "react"

import { SharedField } from "@xpfw/form-shared"
import { IFormCreateProps, ISharedFormCreate, SharedFormCreate } from "@xpfw/ui-shared"
import {  IField } from "@xpfw/validate"
import { get } from "lodash"
import { Button, Block, BlockTitle, List } from "framework7-react";

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
          <Block strong inset>
            <p>please recheck your inputs or connection {JSON.stringify(get(this.props, "error"))}</p>
          </Block>
        </div>
      )
    }
    if (result) {
      msg = (
        <div>        
          <BlockTitle>Success</BlockTitle>
          <Block strong inset>
            <p>created {get(result, get(this.props.form, "options.idPath", "_id"))}</p>
          </Block>
        </div>
      )
    }
    return (
      <div>
        <List form>
          <ul>
            {fields}
          </ul>
        </List>
        <Button onClick={this.props.submitCreate} iconFa="plus" fill>Create</Button>
        {msg}
      </div>
    )
  }
}

const WrappedFramework7Create: React.ComponentType<ISharedFormCreate> = SharedFormCreate<{}>(Framework7Create)
export default WrappedFramework7Create