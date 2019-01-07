import makeApp from "isofw-node/src/app"
import prerender from "isofw-node/src/prerender"

const app: any = makeApp(prerender({
  javascript: {main: "isoapp.js"},
  styles: {main: "isofwwebstyles.css"}
}))
app.listen(4202, () => {
  console.log("Now listening")
})
