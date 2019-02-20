import { FeathersClient } from "@xpfw/data-feathers"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { changeMapping, togglePop } from "isofw-shared/src/components/project/cameraMapping"
import { directorPrefix } from "isofw-shared/src/components/project/directorSheet"
import createTestCameras, { testCameras } from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers, { testUsers } from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import { BackendClient } from "isofw-shared/src/util/xpfwdata"
import { FormStore, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { ProjectCameras, ProjectOperatorCameraMapping, ProjectOperators } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"

BackendClient.client = FeathersClient

const cameraMappingTest = () => {
  describe(" camera mapping test ", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, "Before anything")
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app)
      const userIds = testUsers.map((item) => item._id)
      FormStore.setValue(prependPrefix(ProjectOperators.title, directorPrefix), userIds)
      const cameraIds = testCameras.map((item) => item._id)
      FormStore.setValue(prependPrefix(ProjectCameras.title, directorPrefix), cameraIds)
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " after preparing operators and cameras ")

      const mapped = changeMapping(ProjectOperatorCameraMapping, undefined, directorPrefix)
      togglePop(ProjectOperatorCameraMapping, undefined, directorPrefix, true)()
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " Showing pop-up")
      mapped(userIds[0], cameraIds[0])()
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " One Operator with one camera")
      mapped(userIds[0], cameraIds[1])()
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " One Operator with 2 camera")
      mapped(userIds[1], cameraIds[2])()
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " One Operator with 2 camera And one with the one")
      mapped(userIds[0], cameraIds[0])()
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " two Operator with one camera")
      mapped(userIds[1], cameraIds[2])()
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, "remove all camearas of one operator")
      togglePop(ProjectOperatorCameraMapping, undefined, directorPrefix, false)()
      renderSnapshot(<SharedField schema={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " Hiding pop-up")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default cameraMappingTest
