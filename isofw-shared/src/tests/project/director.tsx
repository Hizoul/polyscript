import { FeathersClient } from "@xpfw/data-feathers"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { directorPrefix, increaseShotNumber } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, toJS } from "isofw-shared/src/util/xpfwdata"
import { ProjectForm, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"
import * as MockDate from "mockdate"
MockDate.set(new Date(4, 2, 0))

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
      const projectId = projectResults[0]._id
      await appRef.app.service(val.service.project).patch(projectId, {[String(ProjectShot.title)]: 42})
      await promiseTimeout(500)
      expect(toJS(DbStore)).toMatchSnapshot(" project pushed by server ")
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, " info pushed by Server ")
      // Shop number edited via client
      const withThis = increaseShotNumber(projectResults[0]._id, false)
      await DbStore.getEditOriginal(projectId, ProjectForm, undefined, directorPrefix, true)
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, "Before manual edits")
      await withThis()
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, "After manual edits")
      expect(toJS(DbStore)).toMatchSnapshot(" project Edited by client")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default directorTest
