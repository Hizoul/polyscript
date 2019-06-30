import { FeathersClient } from "@xpfw/data-feathers"
import console = require("console")
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { directorPrefix, increaseShotNumber } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import BenchmarkStore from "isofw-shared/src/network/benchmarkStore"
import { makeRandomProgram } from "isofw-shared/src/network/causeProjectTraffic"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, toJS } from "isofw-shared/src/util/xpfwdata"
import { ProjectForm, ProjectProgram, ProjectShot } from "isofw-shared/src/xpfwDefs/project"
import * as MockDate from "mockdate"
import * as React from "react"
import { random } from "isofw-shared/src/util/predictableRandomness"
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
      BenchmarkStore.programSize = 3
      random.setSeed(42)
      const patchRes = await appRef.app.service(val.service.project).patch(projectId, {
        [String(ProjectShot.title)]: 1,
        [String(ProjectProgram.title)]: makeRandomProgram()
      })
      await promiseTimeout(500)
      expect(toJS(DbStore)).toMatchSnapshot(" project pushed by server ")
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, " info pushed by Server ")
      // Shop number edited via client
      const withThis = increaseShotNumber(projectResults[0]._id, false)
      await DbStore.getEditOriginal(projectId, ProjectForm, undefined, directorPrefix, true)
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, "Before manual edits")
      await withThis()
      await withThis()
      await withThis()
      await withThis()
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, "regardless of many increases the max stays at 2")
      const reduche = increaseShotNumber(projectResults[0]._id, true)
      await reduche()
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, "reduced to 1")
      await reduche()
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, "reduced to 0")
      await reduche()
      renderSnapshot(<Component schema={ProjectForm} id={projectId.toHexString()} prefix={directorPrefix}/>, "stays at 0 because thats minimum")
      expect(toJS(DbStore)).toMatchSnapshot(" project Edited by client")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default directorTest
