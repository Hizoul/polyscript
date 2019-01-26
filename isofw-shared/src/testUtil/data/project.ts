import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import {
  OperatorRelation, ProjectCameras, ProjectForm, ProjectName,
  ProjectOperatorCameraMapping, ProjectOperators, ProjectProgram, ProjectShot,
  ShotCamera, ShotDuration, ShotImportance, ShotMovement, ShotMovementTowards, ShotName, ShotRemarksDirector, ShotRemarksOperator
} from "isofw-shared/src/xpfwDefs/project"
import { testCameras } from "./camera"
import { testUsers } from "./users"

const testProjects: any[] = [
  {_id: "b19999999999999999999999", [ProjectName.mapTo]: "pn1", [ProjectShot.mapTo]: 1},
  {_id: "b29999999999999999999999", [ProjectName.mapTo]: "pn2", [ProjectShot.mapTo]: 8},
  {_id: "b39999999999999999999999", [ProjectName.mapTo]: "pn3", [ProjectShot.mapTo]: 6}
]
8
const createTestProjects = async (app: any, andMappings: boolean = false, andProgram: boolean = false) => {
  if (andMappings) {
    testProjects[0][ProjectOperators.mapTo] = [testUsers[0]._id, testUsers[1]._id]
    testProjects[0][ProjectCameras.mapTo] = [testCameras[0]._id, testCameras[1]._id, testCameras[2]._id]
    testProjects[0][ProjectOperatorCameraMapping.mapTo] = [
      {[OperatorRelation.mapTo]: testUsers[0]._id, [ProjectCameras.mapTo]: [testCameras[0]._id, testCameras[2]._id]},
      {[OperatorRelation.mapTo]: testUsers[1]._id, [ProjectCameras.mapTo]: [testCameras[1]._id]}
    ]
    testProjects[1][ProjectOperators.mapTo] = [testUsers[0]._id, testUsers[2]._id]
    testProjects[1][ProjectCameras.mapTo] = [testCameras[0]._id, testCameras[1]._id]
    testProjects[1][ProjectOperatorCameraMapping.mapTo] = [
      {[OperatorRelation.mapTo]: testUsers[2]._id, [ProjectCameras.mapTo]: [testCameras[0]._id]},
      {[OperatorRelation.mapTo]: testUsers[0]._id, [ProjectCameras.mapTo]: [testCameras[1]._id]}
    ]
    testProjects[2][ProjectOperators.mapTo] = [testUsers[1]._id, testUsers[2]._id]
    testProjects[2][ProjectCameras.mapTo] = [testCameras[0]._id, testCameras[2]._id]
    testProjects[2][ProjectOperatorCameraMapping.mapTo] = [
      {[OperatorRelation.mapTo]: testUsers[2]._id, [ProjectCameras.mapTo]: [testCameras[0]._id]},
      {[OperatorRelation.mapTo]: testUsers[1]._id, [ProjectCameras.mapTo]: [testCameras[2]._id]}
    ]
  }
  if (andProgram) {
    testProjects[0][ProjectProgram.mapTo] = [
      {
        [ShotName.mapTo]: "S#1", [ShotMovement.mapTo]: "m#1",  [ShotMovementTowards.mapTo]: "mt#1",
        [ShotDuration.mapTo]: 5, [ShotRemarksDirector.mapTo]: "rd#1", [ShotRemarksOperator.mapTo]: "ro#1",
        [ShotCamera.mapTo]: testCameras[0]._id
      },
      {
        [ShotName.mapTo]: "S#2", [ShotMovement.mapTo]: "m#2",  [ShotMovementTowards.mapTo]: "mt#2",
        [ShotDuration.mapTo]: 6, [ShotRemarksDirector.mapTo]: "rd#2", [ShotRemarksOperator.mapTo]: "ro#2",
        [ShotCamera.mapTo]: testCameras[2]._id, [ShotImportance.mapTo]: "r"
      },
      {
        [ShotName.mapTo]: "S#3", [ShotMovement.mapTo]: "m#3",  [ShotMovementTowards.mapTo]: "mt#3",
        [ShotDuration.mapTo]: 1, [ShotRemarksDirector.mapTo]: "rd#3", [ShotRemarksOperator.mapTo]: "ro#3",
        [ShotCamera.mapTo]: testCameras[1]._id
      },
      {
        [ShotName.mapTo]: "S#4", [ShotMovement.mapTo]: "m#4",  [ShotMovementTowards.mapTo]: "mt#4",
        [ShotDuration.mapTo]: 3, [ShotRemarksDirector.mapTo]: "rd#4", [ShotRemarksOperator.mapTo]: "ro#4",
        [ShotCamera.mapTo]: testCameras[0]._id, [ShotImportance.mapTo]: "m"
      },
      {
        [ShotName.mapTo]: "S#5", [ShotMovement.mapTo]: "m#5",  [ShotMovementTowards.mapTo]: "mt#5",
        [ShotDuration.mapTo]: 2, [ShotRemarksDirector.mapTo]: "rd#5", [ShotRemarksOperator.mapTo]: "ro#5",
        [ShotCamera.mapTo]: testCameras[1]._id
      },
      {
        [ShotName.mapTo]: "S#6", [ShotMovement.mapTo]: "m#6",  [ShotMovementTowards.mapTo]: "mt#6",
        [ShotDuration.mapTo]: 2, [ShotRemarksDirector.mapTo]: "rd#6", [ShotRemarksOperator.mapTo]: "ro#6",
        [ShotCamera.mapTo]: testCameras[2]._id
      }
    ]
  }
  const newProjects = []
  for (const newUser of testProjects) {
    newProjects.push(await app.service(val.service.project).create(newUser, isServerParams))
  }
  return newProjects
}

export default createTestProjects
export {
  testProjects
}
