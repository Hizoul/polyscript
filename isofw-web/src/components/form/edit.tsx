import { FormStore, SharedField } from "@xpfw/form-shared"
import { IFormEditProps, ISharedFormEdit, ListStore, SharedFormEdit } from "@xpfw/ui-shared"
import { getFieldsFromForm,  IField } from "@xpfw/validate"
import { Block, BlockTitle, Button, List } from "framework7-react"
import { get } from "lodash"
import * as React from "react"
import WebButton from "../button"

class MiniEdit extends React.Component<IFormEditProps, any> {
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
            <p>Saved changes to {get(result, get(this.props.form, "options.idPath", "_id"))}</p>
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
        <WebButton className="marginTopBottom" onClick={this.props.submitEdit} iconFa="save" fill={true} text="Save" loading={this.props.loading} />
        {msg}
      </div>
    )
  }
}

const Framework7Edit: React.ComponentType<ISharedFormEdit> = SharedFormEdit<{}>(MiniEdit)

export default Framework7Edit
