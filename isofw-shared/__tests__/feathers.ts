import getRandomApp from "isofw-node/src/testUtil/getRandomApp"
import ClientHolder from "isofw-shared/src/feathers"

test("DbStore Patch Test", async () => {
  const appRef = await getRandomApp("memserv", false, ClientHolder, false)
  expect(await appRef.app.service("memserv").create({my: "ele"})).toMatchSnapshot("simple creation")
  await appRef.cleanUp()
}, 10000)
