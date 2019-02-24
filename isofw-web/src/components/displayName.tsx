import { IGetHookProps, useGet, useGetWithProps, MailField } from "@xpfw/data"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import val from "../../../isofw-shared/src/globals/val";
import { ProjectName } from "../../../isofw-shared/src/xpfwDefs/project";

export interface INameDisplayer extends IGetHookProps {
  getNameFrom: string
  placeholder?: string
}

export interface SubDisplayer {
  id: string
  placeholder?: string
}

const NameDisplayer: React.FunctionComponent<INameDisplayer> = observer((props) => {
  const gotten = useGetWithProps(props)
  return (
    <span>{get(gotten.item, props.getNameFrom, props.placeholder)}</span>
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