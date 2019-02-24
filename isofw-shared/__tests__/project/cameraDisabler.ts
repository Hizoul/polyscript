import { ComponentRegistry } from "@xpfw/form"
import useCameraDisabler from "isofw-shared/src/components/project/cameraDisabler"
import cameraDisablerTest from "isofw-shared/src/tests/project/cameraDisabler"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import { DisabledCameras } from "isofw-shared/src/xpfwDefs/project"

ComponentRegistry.registerComponent("array",
  makeMockElement("disabler", (props) => useCameraDisabler(props.schema, props.mapTo, props.prefix)),
  DisabledCameras.theme)
cameraDisablerTest()
