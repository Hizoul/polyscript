import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import { FormStore } from "@xpfw/form-shared"
import { FeathersClient } from "@xpfw/ui-feathers"
import { BackendClient, DbStore, ListStore, MailField, PwField, UserStore } from "@xpfw/ui-shared"
import { TestDefs, ValidationRegistry } from "@xpfw/validate"
import createTestUsers from "isofw-shared/src/testUtil/data/users"
import logIntoUser from "isofw-shared/src/testUtil/login"
import createTestProjects from "isofw-shared/src/testUtil/data/project"

BackendClient.client = FeathersClient

const directorTest = (Component: any) => {
  describe(" direct a test ", () => {
    it(" can increase number ", async () => {
      console.log("about to create client")
      const appRef = await getRandomApp(" not important ", true, BackendClient.client, false)
      console.log("about to create users")
      const userResults = await createTestUsers(appRef.app)
      console.log("about to Lo")
      await logIntoUser()
      console.log("logged in")
      const projectResults = await createTestProjects(appRef.app)
      console.log("Created Projects")
      expect(projectResults).toMatchSnapshot(" creation of projects ")
      await appRef.cleanUp()
    }, 100000)
  })
}
export default directorTest