import { MailField, PwField } from "@xpfw/ui-shared"
import val from "isofw-shared/src/globals/val"
import isServerParams from "isofw-shared/src/globals/isServerParams"
import { ProjectForm, ProjectName, ProjectShot } from "isofw-shared/src/xpfwDefs/project";

const testProjects = [
  {_id: "p1", [ProjectName.mapTo]: "pn1", [ProjectShot.mapTo]: 1},
  {_id: "p2", [ProjectName.mapTo]: "pn2", [ProjectShot.mapTo]: 8},
  {_id: "p3", [ProjectName.mapTo]: "pn3", [ProjectShot.mapTo]: 6}
]
8
const createTestProjects = async (app: any) => {
  const newProjects = []
  for (const newUser of testProjects) {
    newProjects.push(await app.service(val.service.user).create(newUser, isServerParams))    
  }
  return newProjects
}

export default createTestProjects
export {
  testProjects
}