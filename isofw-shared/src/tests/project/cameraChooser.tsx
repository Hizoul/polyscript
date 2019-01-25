import { FormStore, SharedField } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { prefixMaker, TestDefs, ValidationRegistry } from "@xpfw/validate"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { togglePop } from "isofw-shared/src/components/project/cameraChooser"
import { directorPrefix, increaseShotNumber } from "isofw-shared/src/components/project/directorSheet"
import val from "isofw-shared/src/globals/val"
import createTestCameras, { testCameras } from "isofw-shared/src/testUtil/data/camera"
import createTestProjects from "isofw-shared/src/testUtil/data/project"
import createTestUsers, { testUsers } from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "isofw-shared/src/util/xpfwuishared"
import { ProjectCameras, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import * as React from "react"
import { matchStoreState } from "resub-persist"
BackendClient.client = FeathersClient

const cameraChooserTest = () => {
  describe(" camera mapping test ", () => {
    it("works as planned", async () => {
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      renderSnapshot(<SharedField field={ShotCamera} prefix={directorPrefix} theme={ShotCamera.theme} />,
        "Before anything")
      const userResults = await createTestUsers(appRef.app)
      await logIntoUser()
      const cameraResult = await createTestCameras(appRef.app)
      const projectResults = await createTestProjects(appRef.app)
      const cameraIds = testCameras.map((item) => item._id)
      FormStore.setValue(prefixMaker(directorPrefix) + ProjectCameras.mapTo, cameraIds)
      renderSnapshot(<SharedField field={ShotCamera} prefix={directorPrefix} theme={ShotCamera.theme} />,
        " after preparing cameras ")
      const thisRef = {
        props: {
          prefix: directorPrefix,
          field: ShotCamera,
          setValue: (newValue: any) => FormStore.setValue(`${prefixMaker(directorPrefix)}${ShotCamera.mapTo}`, newValue)
        }, state: {
          showPopUp: false
        }
      }
      thisRef.props.setValue(cameraIds[1])
      renderSnapshot(<SharedField field={ShotCamera} prefix={directorPrefix} theme={ShotCamera.theme} />,
        " after Setting Camera ")
      await DbStore.getFromServer(cameraIds[1], val.service.camera)
      await DbStore.getFromServer(cameraIds[0], val.service.camera)
      await DbStore.getFromServer(cameraIds[2], val.service.camera)
      renderSnapshot(<SharedField field={ShotCamera} prefix={directorPrefix} theme={ShotCamera.theme} />,
        " after Fetching cameras ")
      const tugger = togglePop(thisRef)
      tugger()
      renderSnapshot(<SharedField field={ShotCamera} prefix={directorPrefix} theme={ShotCamera.theme} />,
        " after Opening pop up ")
      tugger({type: "popup:closed"})
      renderSnapshot(<SharedField field={ShotCamera} prefix={directorPrefix} theme={ShotCamera.theme} />,
        " after Closing pop up ")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default cameraChooserTest
