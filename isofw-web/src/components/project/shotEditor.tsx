import * as React from "react"
import { SharedFormEdit, IFormEditProps, DbStore } from "@xpfw/ui-shared";
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project";
import { FormStore } from "@xpfw/form-shared";
import sharedDirectorComponent, { DirectorComponentProps } from "isofw-shared/src/components/project/directorSheet";
import LoadingPage from "../loading";
import WebButton from "../button";
import { get } from "lodash"

const ShotEditor = (props: DirectorComponentProps) => {
  return (
    <div>
        Editing page
        {props.loading ? <LoadingPage /> : null}
        Shop number is: {get(props, "original.result.shot") }
        <WebButton
         text={" change "}
         onClick={props.increase}
        />
    </div>
  )
}

export default sharedDirectorComponent(ShotEditor)