import { FeathersClient } from "@xpfw/data-feathers"
import { FormStore } from "@xpfw/form/dist"
import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import mockCameras from "isofw-node/src/testUtil/mockCameras"
import { savePresetData, updatePreset } from "isofw-shared/src/components/preset/updater"
import useCameraActions from "isofw-shared/src/components/project/cameraActions"
import val from "isofw-shared/src/globals/val"
import createTestCameras from "isofw-shared/src/testUtil/data/camera"
import createTestProjects, { testProjects } from "isofw-shared/src/testUtil/data/project"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import renderSnapshot from "isofw-shared/src/testUtil/renderSnapshot"
import promiseTimeout from "isofw-shared/src/util/promiseTimeout"
import { BackendClient, DbStore, ListStore } from "isofw-shared/src/util/xpfwdata"
import { PresetForm } from "isofw-shared/src/xpfwDefs/preset"
import { ProjectForm, ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import * as MockDate from "mockdate"
import * as React from "react"

MockDate.set(new Date(4, 2, 0))

BackendClient.client = FeathersClient
const untypedDbStore: any = DbStore

describe("Camera actions", () => {
  it("works as planned", async () => {
    const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
    await createTestUsers(appRef.app)
    await logIntoUser()
    await createTestCameras(appRef.app)
    const mockedCameras = await mockCameras(appRef.app)
    const projectResults = await createTestProjects(appRef.app, true)
    const presetList = await ListStore.getList(PresetForm, undefined, undefined, true)
    await DbStore.getFromServer(testProjects[0]._id, val.service.project)
    FormStore.setValue(ProjectForm.title, projectResults[0])
    expect(mockedCameras[0].requests).toMatchSnapshot("requests before anything")
    const actionHelper = useCameraActions(ShotCamera, undefined, ProjectForm.title)
    await actionHelper.teleZoom()
    await actionHelper.wideZoom()
    await actionHelper.stopZoom()
    expect(mockedCameras[0].requests).toMatchSnapshot("requests After buttons")
    await promiseTimeout(1000)
    await appRef.cleanUp()
  }, 100000)
})
