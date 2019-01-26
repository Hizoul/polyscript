import { FormStore, SharedField } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { prefixMaker, TestDefs, ValidationRegistry } from "@xpfw/validate"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { changeMapping, togglePop } from "isofw-shared/src/components/project/cameraMapping"
import { directorPrefix, increaseShotNumber } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import createTestCameras, { testCameras } from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers, { testUsers } from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "isofw-shared/src/util/xpfwuishared"
import { ProjectCameras, ProjectOperatorCameraMapping, ProjectOperators } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"
import { matchStoreState } from "resub-persist"
BackendClient.client = FeathersClient

const cameraMappingTest = () => {
  describe(" camera mapping test ", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, "Before anything")
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app)
      const userIds = testUsers.map((item) => item._id)
      FormStore.setValue(prefixMaker(directorPrefix) + ProjectOperators.mapTo, userIds)
      const cameraIds = testCameras.map((item) => item._id)
      FormStore.setValue(prefixMaker(directorPrefix) + ProjectCameras.mapTo, cameraIds)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " after preparing operators and cameras ")
      const thisRef = {
        props: {
          value: [],
          prefix: directorPrefix,
          setValue: (newValue: any) => FormStore.setValue(`${prefixMaker(directorPrefix)}${ProjectOperatorCameraMapping.mapTo}`, newValue)
        }, state: {
          showPopUp: false
        }
      }
      const mapped = changeMapping(thisRef)
      const tugger = togglePop(thisRef)
      tugger()
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " Showing pop-up")
      mapped(userIds[0], cameraIds[0])()
      thisRef.props.value = FormStore.getValue(`${prefixMaker(directorPrefix)}${ProjectOperatorCameraMapping.mapTo}`)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " One Operator with one camera")
      mapped(userIds[0], cameraIds[1])()
      thisRef.props.value = FormStore.getValue(`${prefixMaker(directorPrefix)}${ProjectOperatorCameraMapping.mapTo}`)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " One Operator with 2 camera")
      mapped(userIds[1], cameraIds[2])()
      thisRef.props.value = FormStore.getValue(`${prefixMaker(directorPrefix)}${ProjectOperatorCameraMapping.mapTo}`)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " One Operator with 2 camera And one with the one")
      mapped(userIds[0], cameraIds[0])()
      thisRef.props.value = FormStore.getValue(`${prefixMaker(directorPrefix)}${ProjectOperatorCameraMapping.mapTo}`)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " two Operator with one camera")
      mapped(userIds[1], cameraIds[2])()
      thisRef.props.value = FormStore.getValue(`${prefixMaker(directorPrefix)}${ProjectOperatorCameraMapping.mapTo}`)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, "remove all camearas of one operator")
      thisRef.state.showPopUp = true
      tugger()
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " Hiding pop-up")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default cameraMappingTest