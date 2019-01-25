import { FormStore } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { TestDefs, ValidationRegistry } from "@xpfw/validate"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { directorPrefix, increaseShotNumber } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout";
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "isofw-shared/src/util/xpfwuishared"
import { ProjectForm, ProjectName, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"
import { matchStoreState } from "resub-persist"
BackendClient.client = FeathersClient

const directorTest = (Component: any) => {
  describe(" direct a test ", () => {
    it(" can increase number ", async () => {
      console.log("about to create client")
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      console.log("about to create users")
      const userResults = await createTestUsers(appRef.app)
      console.log("about to Lo")
      await logIntoUser()
      console.log("logged in")
      const projectResults = await createTestProjects(appRef.app)
      console.log("Created Projects")
      // Shop number automatically pushed After Server change
      console.log("Server patch Projects")
      await appRef.app.service(val.service.project).patch(projectResults[0]._id, {[ProjectShot.mapTo]: 42})
      await promiseTimeout(500)
      matchStoreState(DbStore, " project pushed by server ")
      renderSnapshot(<Component form={ProjectForm} id={projectResults[0]._id.toHexString()} prefix={directorPrefix}/>, " info pushed by Server ")
      // Shop number edited via client
      const artificialThis = {
        props: {id: projectResults[0]._id}
      }
      const withThis = increaseShotNumber(artificialThis)
      console.log("Client patch Projects")
      await DbStore.getEditOriginal(projectResults[0]._id, ProjectForm, directorPrefix, true)
      console.log("About to submit", await FormStore.getFormData(ProjectForm, directorPrefix))
      renderSnapshot(<Component form={ProjectForm} id={projectResults[0]._id.toHexString()} prefix={directorPrefix}/>, "Before manual edits")
      await withThis()
      renderSnapshot(<Component form={ProjectForm} id={projectResults[0]._id.toHexString()} prefix={directorPrefix}/>, "After manual edits")
      matchStoreState(DbStore, " project Edited by client")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default directorTest
