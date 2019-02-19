import isServerParams from "isofw-shared/src/globals/isServerParams"
import val from "isofw-shared/src/globals/val"
import {
  IsActiveField, OperatorRelation, ProjectCameras, ProjectForm,
  ProjectName, ProjectOperatorCameraMapping, ProjectOperators, ProjectProgram,
  ProjectShot, ShotCamera, ShotDuration, ShotImportance, ShotMovement, ShotMovementTowards, ShotName, ShotRemarksDirector, ShotRemarksOperator
} from "isofw-shared/src/xpfwDefs/project"
import { testCameras } from "./camera"
import { testUsers } from "./users"

const testProjects: any[] = [
  {_id: "b19999999999999999999999", [String(ProjectName.title)]: "pn1", [String(ProjectShot.title)]: 1, [String(IsActiveField.title)]: true},
  {_id: "b29999999999999999999999", [String(ProjectName.title)]: "pn2", [String(ProjectShot.title)]: 8, [String(IsActiveField.title)]: true},
  {_id: "b39999999999999999999999", [String(ProjectName.title)]: "pn3", [String(ProjectShot.title)]: 6, [String(IsActiveField.title)]: true}
]
8
const createTestProjects = async (app: any, andMappings: boolean = false, andProgram: boolean = false) => {
  if (andMappings) {
    testProjects[0][String(ProjectOperators.title)] = [testUsers[0]._id, testUsers[1]._id]
    testProjects[0][String(ProjectCameras.title)] = [testCameras[0]._id, testCameras[1]._id, testCameras[2]._id]
    testProjects[0][String(ProjectOperatorCameraMapping.title)] = [
      {[String(OperatorRelation.title)]: testUsers[0]._id, [String(ProjectCameras.title)]: [testCameras[0]._id, testCameras[2]._id]},
      {[String(OperatorRelation.title)]: testUsers[1]._id, [String(ProjectCameras.title)]: [testCameras[1]._id]}
    ]
    testProjects[1][String(ProjectOperators.title)] = [testUsers[0]._id, testUsers[2]._id]
    testProjects[1][String(ProjectCameras.title)] = [testCameras[0]._id, testCameras[1]._id]
    testProjects[1][String(ProjectOperatorCameraMapping.title)] = [
      {[String(OperatorRelation.title)]: testUsers[2]._id, [String(ProjectCameras.title)]: [testCameras[0]._id]},
      {[String(OperatorRelation.title)]: testUsers[0]._id, [String(ProjectCameras.title)]: [testCameras[1]._id]}
    ]
    testProjects[2][String(ProjectOperators.title)] = [testUsers[1]._id, testUsers[2]._id]
    testProjects[2][String(ProjectCameras.title)] = [testCameras[0]._id, testCameras[2]._id]
    testProjects[2][String(ProjectOperatorCameraMapping.title)] = [
      {[String(OperatorRelation.title)]: testUsers[2]._id, [String(ProjectCameras.title)]: [testCameras[0]._id]},
      {[String(OperatorRelation.title)]: testUsers[1]._id, [String(ProjectCameras.title)]: [testCameras[2]._id]}
    ]
  }
  if (andProgram) {
    testProjects[0][String(ProjectProgram.title)] = [
      {
        [String(ShotName.title)]: "S#1", [String(ShotMovement.title)]: "m#1",  [String(ShotMovementTowards.title)]: "mt#1",
        [String(ShotDuration.title)]: 5, [String(ShotRemarksDirector.title)]: "rd#1", [String(ShotRemarksOperator.title)]: "ro#1",
        [String(ShotCamera.title)]: testCameras[0]._id
      },
      {
        [String(ShotName.title)]: "S#2", [String(ShotMovement.title)]: "m#2",  [String(ShotMovementTowards.title)]: "mt#2",
        [String(ShotDuration.title)]: 6, [String(ShotRemarksDirector.title)]: "rd#2", [String(ShotRemarksOperator.title)]: "ro#2",
        [String(ShotCamera.title)]: testCameras[2]._id, [String(ShotImportance.title)]: "r"
      },
      {
        [String(ShotName.title)]: "S#3", [String(ShotMovement.title)]: "m#3",  [String(ShotMovementTowards.title)]: "mt#3",
        [String(ShotDuration.title)]: 1, [String(ShotRemarksDirector.title)]: "rd#3", [String(ShotRemarksOperator.title)]: "ro#3",
        [String(ShotCamera.title)]: testCameras[1]._id
      },
      {
        [String(ShotName.title)]: "S#4", [String(ShotMovement.title)]: "m#4",  [String(ShotMovementTowards.title)]: "mt#4",
        [String(ShotDuration.title)]: 3, [String(ShotRemarksDirector.title)]: "rd#4", [String(ShotRemarksOperator.title)]: "ro#4",
        [String(ShotCamera.title)]: testCameras[0]._id, [String(ShotImportance.title)]: "m"
      },
      {
        [String(ShotName.title)]: "S#5", [String(ShotMovement.title)]: "m#5",  [String(ShotMovementTowards.title)]: "mt#5",
        [String(ShotDuration.title)]: 2, [String(ShotRemarksDirector.title)]: "rd#5", [String(ShotRemarksOperator.title)]: "ro#5",
        [String(ShotCamera.title)]: testCameras[1]._id
      },
      {
        [String(ShotName.title)]: "S#6", [String(ShotMovement.title)]: "m#6",  [String(ShotMovementTowards.title)]: "mt#6",
        [String(ShotDuration.title)]: 2, [String(ShotRemarksDirector.title)]: "rd#6", [String(ShotRemarksOperator.title)]: "ro#6",
        [String(ShotCamera.title)]: testCameras[2]._id
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
