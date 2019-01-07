/*
In NativeScript, the app.js file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

require("./bundle-config");
import { h, render, preload } from "preact-to-nativescript"
import * as application from "tns-core-modules/application"
import * as frame from "tns-core-modules/ui/frame"
import DemoApp from "./start"
import * as React from "react"
preload()
application.start({
  create: () => {
    const p: any = h("page", {}, [])
    return render(<DemoApp />, null)
  }
})
