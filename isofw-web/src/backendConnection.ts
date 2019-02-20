import connect from "isofw-shared/src/util/backendConnection"
import { get } from "lodash"

connect(get(global, "window.localStorage"))
