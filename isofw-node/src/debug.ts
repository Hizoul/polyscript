import makeApp from "isofw-node/src/app"

const app: any = makeApp()
app.listen(4202, () => {
  console.log("Now listening")
})
