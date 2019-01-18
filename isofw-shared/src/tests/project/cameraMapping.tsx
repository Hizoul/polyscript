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
import { changeMapping } from "isofw-shared/src/components/project/cameraMapping";
BackendClient.client = FeathersClient

const cameraMappingTest = () => {
  describe(" camera mapping test ", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, "Before anything")
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      expect(cameraResult).toMatchSnapshot(" creation of cameras ")
      const projectResults = await createTestProjects(appRef.app)
      expect(projectResults).toMatchSnapshot(" creation of proInjects ")
      const userIds = testUsers.map((item) => item._id)
      FormStore.setValue(prefixMaker(directorPrefix) + ProjectOperators.mapTo, userIds)
      const cameraIds = testCameras.map((item) => item._id)
      FormStore.setValue(prefixMaker(directorPrefix) + ProjectCameras.mapTo, cameraIds)
      renderSnapshot(<SharedField field={ProjectOperatorCameraMapping} prefix={directorPrefix} theme={ProjectOperatorCameraMapping.theme} />, " after preparing operators and cameras ")
      const thisRef = {
        props: {
          value: [],
          setValue: (newValue: any) => FormStore.setValue(`${prefixMaker(directorPrefix)}${ProjectOperatorCameraMapping.mapTo}`, newValue)
        }
      }
      const mapped = changeMapping(thisRef)
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
      await promiseTimeout(1200)
      await appRef.cleanUp()
    }, 100000)
  })
}
export default cameraMappingTest