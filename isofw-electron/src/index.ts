import { app, BrowserWindow } from "electron"
import makeApp from "isofw-node/src/app"
import func from "isofw-shared/src/func"
import val from "isofw-shared/src/globals/val"
import * as path from "path"
import * as process from "process"
import * as url from "url"

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win: Electron.BrowserWindow | null

const createWindow = () => {
  // Create the browser window.
  win = new BrowserWindow({width: 1240, height: 768})
  // and load the index.html of the app.
  const addOn = process.platform === "darwin" ? "../Resources/app/app/ssr.html" : "./resources/app/app/ssr.html"
  win.loadURL(url.format({
    pathname: val.isDebug ?
      path.resolve("../isofw-web/webpackDist/app/ssr.html") : path.join(path.dirname(process.execPath), addOn),
    protocol: "file:",
    slashes: true
  }))
  // Open the DevTools.
  if (val.isDebug) {
    win.webContents.openDevTools()
  }
  const myapp = makeApp()
  myapp.listen(4202, () => {
    console.log("now listening")
  })

  // Emitted when the window is closed.
  win.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow)

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You csan also put them in separate files and require them here.
