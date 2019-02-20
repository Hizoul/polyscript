
import { FeathersClient } from "@xpfw/data-feathers"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { changeValue, currentOperatorKey, whichViewIsActiveKey } from "isofw-shared/src/components/project/operatorInfo"
import val from "isofw-shared/src/globals/val"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import { BackendClient, DbStore } from "isofw-shared/src/util/xpfwdata"
import {
  ProjectOperators
} from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"

BackendClient.client = FeathersClient

const operatorInfoTest = (Component: any) => {
  describe(" operator info test ", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      await createTestUsers(appRef.app)
      await logIntoUser()
      await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true, true)
      const operatorChanger = changeValue(currentOperatorKey)
      const activeViewChanger = changeValue(whichViewIsActiveKey)
      const projectId = projectResults[0]._id
      await DbStore.getFromServer(projectId, val.service.project)
      renderSnapshot(<Component id={projectId} />, "Before anything")
      operatorChanger(projectResults[0][String(ProjectOperators.title)][0])()
      renderSnapshot(<Component id={projectId} />, "first user selected")
      operatorChanger(projectResults[0][String(ProjectOperators.title)][1])()
      renderSnapshot(<Component id={projectId} />, "2nd user selected")
      operatorChanger("blabliblu")()
      renderSnapshot(<Component id={projectId} />, "Invalid user selected")
      operatorChanger("")()
      renderSnapshot(<Component id={projectId} />, "Removed user selection")

      activeViewChanger(1)()
      renderSnapshot(<Component id={projectId} />, "Preset view active No user selected")
      operatorChanger(projectResults[0][String(ProjectOperators.title)][0])()
      renderSnapshot(<Component id={projectId} />, "Preset view active first user selected")
      activeViewChanger(0)()
      renderSnapshot(<Component id={projectId} />, "Preset view disabled")

      await appRef.cleanUp()
    }, 100000)
  })
}
export default operatorInfoTest
