import { IGetHookProps, MailField, useGetWithProps } from "@xpfw/data"
import val from "isofw-shared/src/globals/val"
import { ProjectName } from "isofw-shared/src/xpfwDefs/project"
import { get, isNumber } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"


export interface INameDisplayer extends IGetHookProps {
  getNameFrom: string
  placeholder?: string
  increaseByOne?: boolean
}

export interface SubDisplayer {
  id: string
  placeholder?: string
}

const NameDisplayer: React.FunctionComponent<INameDisplayer> = observer((props) => {
  const gotten = useGetWithProps(props)
  let name = get(gotten.item, props.getNameFrom, props.placeholder)
  if (props.increaseByOne && isNumber(name)) {
    name += 1
  }
  return (
    <span>{name}</span>
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
