import connect from "isofw-shared/src/util/backendConnection"
import { get } from "lodash"

const doConnection = () => {
  connect(get(global, "window.localStorage"))
}

export default doConnection
