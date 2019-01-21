import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { FormStore, SharedField } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "isofw-shared/src/util/xpfwuishared"
import { TestDefs, ValidationRegistry, prefixMaker } from "@xpfw/validate"
import createTestUsers, { testUsers } from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestCameras, { testCameras } from "isofw-shared/src/testUtil/data/camera"
import { increaseShotNumber, directorPrefix } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import { ProjectForm, ProjectName, ProjectShot, ProjectOperatorCameraMapping, ProjectOperators, ProjectCameras } from "isofw-shared/src/xpfwDefs/project"
import { matchStoreState } from "resub-persist"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout";
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import * as React from "react"
import { changeOperator } from "isofw-shared/src/components/project/operatorInfo";
BackendClient.client = FeathersClient

const operatorInfoTest = (Component: any) => {
  describe(" operator info test ", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true)
      const thisRef = {}
      const changer = changeOperator(thisRef)
      renderSnapshot(<Component item={projectResults[0]} />, "Before anything")
      changer(projectResults[0][ProjectOperators.mapTo][0])()
      renderSnapshot(<Component item={projectResults[0]} />, "first user selected")
      changer("blabliblu")()
      renderSnapshot(<Component item={projectResults[0]} />, "Invalid user selected")
      changer("")()
      renderSnapshot(<Component item={projectResults[0]} />, "Removed user selection")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default operatorInfoTest