import { ComponentRegistry } from "@xpfw/form"
import useCameraChooser from "isofw-shared/src/components/project/cameraChooser"
import cameraChooserTest from "isofw-shared/src/tests/project/cameraChooser"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import { ShotCamera } from "isofw-shared/src/xpfwDefs/project"

ComponentRegistry.registerComponent("string",
  makeMockElement("DirectorEle", (props) => useCameraChooser(props.schema, props.mapTo, props.prefix)),
  ShotCamera.theme)
cameraChooserTest()
