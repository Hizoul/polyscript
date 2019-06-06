import cameraApi, { cameraCommand } from "isofw-shared/src/cameraApi"
import { getPresetDataUE70 } from "isofw-shared/src/cameraApi/ue70"
import val from "isofw-shared/src/globals/val"
import { CameraIp } from "isofw-shared/src/xpfwDefs/camera"
import {
  EMPTY_PRESET, PresetActionTypeField, PresetCameraField,
  PresetFocusField, PresetIrisField, PresetNumberField, PresetPanField,
  PresetProjectField,
  PresetTiltField,
  PresetZoomField
} from "isofw-shared/src/xpfwDefs/preset"
import { ProjectCameras, ProjectProgram, ProjectShot, ShotCamera, ShotNumber, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import { get } from "lodash"
import { Collection, Db, ObjectId } from "mongodb"

const camerasPreset: {[index: string]: string | undefined} = {}

const cameraControl = async (db: Db, cameraId: any, data: any) => {
  const camera = data.preloadedCam ? data.preloadedCam :
    await db.collection(val.service.camera).findOne({_id: new ObjectId(cameraId)})
  if (!camera) {
    return Promise.reject(" unknown Camera ")
  }
  const cameraIp = camera[String(CameraIp.title)]
  const presetNumber = data.preset ?
    data.preset[String(PresetNumberField.title)] : data[String(PresetNumberField.title)]
  switch (data[String(PresetActionTypeField.title)]) {
    case cameraCommand.goToPreset: {
      if (val.handlePresetsSelf) {
        const preset = data.preset ? data.preset :
          db.collection(val.service.preset).findOne({_id: new ObjectId(data[String(PresetCameraField.title)])})
        const promises = [
          cameraApi.doPanTiltToPosition(cameraIp,
            preset[String(PresetPanField.title)], preset[String(PresetTiltField.title)]),
          cameraApi.doZoomToPosition(cameraIp, preset[String(PresetZoomField.title)]),
          cameraApi.doFocusToPosition(cameraIp, preset[String(PresetFocusField.title)]),
          cameraApi.doIrisToPosition(cameraIp, preset[String(PresetIrisField.title)])
        ]
        return Promise.all(promises)
      }
      return cameraApi.goToPreset(cameraIp, presetNumber)
    }
    case cameraCommand.updatePreset: {
      if (val.handlePresetsSelf) {
        const presetData = await getPresetDataUE70(cameraIp)
        db.collection(val.service.preset).update(
          {_id: new ObjectId(data[String(PresetCameraField.title)])}, {$set: presetData})
      }
      return cameraApi.updatePreset(cameraIp, presetNumber)
    }
    case cameraCommand.doZoom: {
      return cameraApi.doZoom(cameraIp, data[String(PresetNumberField.title)])
    }
    default: {
      return Promise.resolve(" unknown command ")
    }
  }
}

const activateNextPresets = async (db: Db, project: any) => {
  const program = get(project, String(ProjectProgram.title), [])
  const currentShot = get(project, String(ProjectShot.title), 0)
  const cameras = get(project, String(ProjectCameras.title), [])
  if (program != null) {
    for (const camera of cameras) {
      cameraShot: for (let i = currentShot; i < program.length; i++) {
        if (program[i] != null && program[i][String(ShotCamera.title)] === camera) {
          const presetToGoTo = program[i][String(ShotPreset.title)]
          if (camerasPreset[camera] !== presetToGoTo) {
            camerasPreset[camera] = presetToGoTo
            try {
              const preset = db.collection(val.service.preset).findOne({_id: new ObjectId(presetToGoTo)})
              await cameraControl(db, camera, {
                preset,
                [String(PresetActionTypeField.title)]: cameraCommand.goToPreset
              })
            } catch (e) {}
          }
          break cameraShot
        }
      }
    }
  }
}

const ensureShotNumber = async (projectCollection: Collection, project: any) => {
  const program = get(project, ProjectProgram.title)
  let needToPushFix = false
  if (program != null && Array.isArray(program)) {
    for (let i = 0; i < program.length; i++) {
      let programEntry = program[i]
      const newNumber = i + 1
      if (programEntry == null) {
        programEntry = {}
        program[i] = programEntry
      }
      if (programEntry[String(ShotNumber.title)] !== newNumber) {
        needToPushFix = true
        programEntry[String(ShotNumber.title)] = newNumber
      }
    }
    if (needToPushFix) {
      await projectCollection.updateOne({_id: project._id}, {$set: {[String(ProjectProgram.title)] : program}})
    }
  }
}

const freeProjectPresets = async (db: Db, project: any) => {
  const presetCol = db.collection(val.service.preset)
  const presetIdsInUse = []
  let projectProgram = get(project, String(ProjectProgram.title))
  if (projectProgram != null && Array.isArray(projectProgram)) {
    projectProgram = []
    for (const programItem of projectProgram) {
      if (programItem != null) {
        const id = programItem[String(ShotPreset.title)]
        if (id) {
          presetIdsInUse.push(id)
        }
      }
    }
  }
  const presets = await presetCol.find({
    [String(PresetProjectField.title)]: val.useNedb ? project._id : project._id.toHexString(),
    _id: {$nin: presetIdsInUse}
  }).limit(99999999).toArray()
  for (const preset of presets) {
    console.log("Freeing up unused preset", preset._id)
    await presetCol.updateOne({_id: preset._id}, {
      $set: {[String(PresetProjectField.title)]: EMPTY_PRESET}
    })
  }
}

const handleProjectHooksNative = async (db: Db, projectId: string) => {
  const projectCol = db.collection(val.service.project)
  const project = await projectCol.findOne({_id: new ObjectId(projectId)})
  await activateNextPresets(db, project)
  await ensureShotNumber(projectCol, project)
  await freeProjectPresets(db, project)
}

export default handleProjectHooksNative
