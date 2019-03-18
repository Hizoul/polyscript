import { BackendClient, DbStore } from "@xpfw/data"
import { FormStore, memo } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { makeRandomProgram } from "isofw-shared/src/network/causeProjectTraffic"
import { testCameras } from "isofw-shared/src/testUtil/data/camera"
import { addMappings, testProjects } from "isofw-shared/src/testUtil/data/project"
import { testUsers } from "isofw-shared/src/testUtil/data/users"

const demoLoadingKey = "demoData"
const demoTotalKey = "demoDataTotal"

const toCreate = [
  {collection: val.service.user, data: testUsers},
  {collection: val.service.camera, data: testCameras},
  {collection: val.service.project, data: testProjects}
]
let totalLength = 0
for (const create of toCreate) {
  totalLength += create.data.length
}
FormStore.setValue(demoTotalKey, totalLength)
addMappings()
const createDemoData = (onlyRemove: boolean) => {
  return async () => {
    FormStore.setLoading(demoLoadingKey, true)
    FormStore.setValue(demoLoadingKey, 0)
    let i = 0
    for (const create of toCreate) {
      for (const entry of create.data) {
        try {
          const removeRes = await DbStore.remove(entry._id, create.collection)
          console.log("REMOVERES IS", removeRes)
        } catch (e) {
          console.log("ERROR removing DEMODATA ", create.collection, entry, e)
        }
        try {
          if (!onlyRemove) {
            if (create.collection === val.service.project) {
              entry.program = makeRandomProgram()
            }
            const createRes = await BackendClient.client.create(create.collection, entry)
            console.log("CREATERES IS", createRes)
          }
        } catch (e) {
          console.log("ERROR create DEMODATA ", create.collection, entry, e)
        }
        FormStore.setValue(demoLoadingKey, ++i)
      }
    }
    FormStore.setLoading(demoLoadingKey, false)
  }
}
const useDemoData = () => {
  return {
    progress: FormStore.getValue(demoLoadingKey, undefined, 0),
    loading: FormStore.getLoading(demoLoadingKey),
    createData: memo(() => createDemoData(false), [demoLoadingKey, false]),
    removeDemoData: memo(() => createDemoData(true), [demoLoadingKey, true]),
    total: FormStore.getValue(demoTotalKey, undefined, 0)
  }
}

export default createDemoData
export {
  demoLoadingKey, useDemoData
}
