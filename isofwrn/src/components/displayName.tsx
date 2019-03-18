import val from "isofw-shared/src/globals/val"
import { IGetHookProps, MailField, useGetWithProps } from "isofw-shared/src/util/xpfwdata"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text } from "react-native"

export interface INameDisplayer {
  getNameFrom: string
  placeholder?: string
  style?: any
}
export interface SubDisplayer {
  id: string
  placeholder?: string
}

const NameDisplayer: React.FunctionComponent<IGetHookProps & INameDisplayer> = observer((props) => {
  const getHelper = useGetWithProps(props)
  return (
    <Text style={props.style}>{get(getHelper.item, props.getNameFrom, props.placeholder)}</Text>
  )
})

const UserNameDisplayer: React.FunctionComponent<SubDisplayer> = (props) => {
  return (
    <NameDisplayer {...props} getNameFrom={String(MailField.title)} collection={val.service.user} />
  )
}

const CameraNameDisplayer: React.FunctionComponent<SubDisplayer> = (props) => {
  return (
    <NameDisplayer {...props} getNameFrom={String(ProjectName.title)} collection={val.service.camera} />
  )
}

const ProjectNameDisplayer: React.FunctionComponent<SubDisplayer> = (props) => {
  return (
    <NameDisplayer {...props} getNameFrom={String(ProjectName.title)} collection={val.service.project} />
  )
}

export default NameDisplayer
export {
  UserNameDisplayer, CameraNameDisplayer, ProjectNameDisplayer
}
