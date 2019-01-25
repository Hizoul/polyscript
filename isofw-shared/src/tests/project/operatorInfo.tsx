import { FormStore, SharedField } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { prefixMaker, TestDefs, ValidationRegistry } from "@xpfw/validate"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { directorPrefix, increaseShotNumber } from "isofw-shared/src/components/project/directorSheet"
import { changeValue, currentOperatorKey, whichViewIsActiveKey } from "isofw-shared/src/components/project/operatorInfo"
import val from "isofw-shared/src/globals/val"
import createTestCameras, { testCameras } from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers, { testUsers } from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "isofw-shared/src/util/xpfwuishared"
import {
  ProjectCameras, ProjectForm, ProjectName, ProjectOperatorCameraMapping, ProjectOperators, ProjectShot
} from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"
import { matchStoreState } from "resub-persist"
BackendClient.client = FeathersClient

const operatorInfoTest = (Component: any) => {
  describe(" operator info test ", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true, true)
      const thisRef = {}
      const operatorChanger = changeValue(thisRef, currentOperatorKey)
      const activeViewChanger = changeValue(thisRef, whichViewIsActiveKey)

      renderSnapshot(<Component item={projectResults[0]} />, "Before anything")
      operatorChanger(projectResults[0][ProjectOperators.mapTo][0])()
      renderSnapshot(<Component item={projectResults[0]} />, "first user selected")
      operatorChanger(projectResults[0][ProjectOperators.mapTo][1])()
      renderSnapshot(<Component item={projectResults[0]} />, "2nd user selected")
      operatorChanger("blabliblu")()
      renderSnapshot(<Component item={projectResults[0]} />, "Invalid user selected")
      operatorChanger("")()
      renderSnapshot(<Component item={projectResults[0]} />, "Removed user selection")

      activeViewChanger(1)()
      renderSnapshot(<Component item={projectResults[0]} />, "Preset view active No user selected")
      operatorChanger(projectResults[0][ProjectOperators.mapTo][0])()
      renderSnapshot(<Component item={projectResults[0]} />, "Preset view active first user selected")
      activeViewChanger(0)()
      renderSnapshot(<Component item={projectResults[0]} />, "Preset view disabled")

      await appRef.cleanUp()
    }, 100000)
  })
}
export default operatorInfoTest
