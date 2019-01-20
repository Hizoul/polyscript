import { MailField, PwField } from "@xpfw/ui-shared"
import val from "isofw-shared/src/globals/val"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import { ProjectForm, ProjectName, ProjectShot, ProjectOperatorCameraMapping, OperatorRelation, ProjectCameras, ProjectOperators } from "isofw-shared/src/xpfwDefs/project";
import { testUsers } from "./users";
import { testCameras } from "./camera";

const testProjects: any[] = [
  {_id: "b19999999999999999999999", [ProjectName.mapTo]: "pn1", [ProjectShot.mapTo]: 1},
  {_id: "b29999999999999999999999", [ProjectName.mapTo]: "pn2", [ProjectShot.mapTo]: 8},
  {_id: "b39999999999999999999999", [ProjectName.mapTo]: "pn3", [ProjectShot.mapTo]: 6}
]
8
const createTestProjects = async (app: any, andMappings: boolean = false) => {
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