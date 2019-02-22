import { FeathersClient, feathersClientOptions } from "@xpfw/data-feathers"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { toggleCamera, toggleOperator } from "isofw-shared/src/components/project/cameraDisabler"
import { directorPrefix } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers, { testUsers } from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import { BackendClient, DbStore, toJS } from "isofw-shared/src/util/xpfwdata"
import { SharedField } from "isofw-shared/src/util/xpfwform"
import { DisabledCameras, ProjectForm } from "isofw-shared/src/xpfwDefs/project"
import * as MockDate from "mockdate"
import * as React from "react"
MockDate.set(new Date(4, 2, 0))

BackendClient.client = FeathersClient
// feathersClientOptions.batchService = val.service.batch

const cameraDisablerTest = () => {
  describe(" camera disabler test ", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      renderSnapshot(<SharedField schema={DisabledCameras} prefix={directorPrefix} theme={DisabledCameras.theme} />,
        "Before anything")
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app, true)
      const u: any = DbStore
      await DbStore.getFromServer(projectResults[0]._id.toHexString() , val.service.project)
      await DbStore.getEditOriginal(projectResults[0]._id.toHexString(), ProjectForm, undefined, undefined)
      renderSnapshot(<SharedField schema={DisabledCameras} prefix={ProjectForm.title} theme={DisabledCameras.theme} />,
        " after preparing operators and camera mapping")
      toggleCamera(DisabledCameras, undefined, ProjectForm.title, cameraResult[0]._id.toHexString())()
      renderSnapshot(<SharedField schema={DisabledCameras} prefix={ProjectForm.title} theme={DisabledCameras.theme} />,
        " after disabling one individual camera")
      toggleOperator(DisabledCameras, undefined, ProjectForm.title, testUsers[0]._id)()
      renderSnapshot(<SharedField schema={DisabledCameras} prefix={ProjectForm.title} theme={DisabledCameras.theme} />,
        " after using toggle operator to turn off the remaining one")
      toggleOperator(DisabledCameras, undefined, ProjectForm.title, testUsers[0]._id)()
      renderSnapshot(<SharedField schema={DisabledCameras} prefix={ProjectForm.title} theme={DisabledCameras.theme} />,
        " after using toggle operator to turn all cameras back on")
      toggleCamera(DisabledCameras, undefined, ProjectForm.title, cameraResult[1]._id.toHexString())()
      renderSnapshot(<SharedField schema={DisabledCameras} prefix={ProjectForm.title} theme={DisabledCameras.theme} />,
        " after disabling one different individual camera")
      toggleCamera(DisabledCameras, undefined, ProjectForm.title, cameraResult[2]._id.toHexString())()
      renderSnapshot(<SharedField schema={DisabledCameras} prefix={ProjectForm.title} theme={DisabledCameras.theme} />,
        " after disabling two individual camera")
      toggleOperator(DisabledCameras, undefined, ProjectForm.title, testUsers[1]._id)()
      renderSnapshot(<SharedField schema={DisabledCameras} prefix={ProjectForm.title} theme={DisabledCameras.theme} />,
        " after one reenabled through toggle operator")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default cameraDisablerTest
