import * as Worker from "tiny-worker"
declare const global: any
global.Worker = Worker

import initiateApp from "./initiateApp"
initiateApp(true)
