import cameraChooserTest from "isofw-shared/src/tests/project/cameraChooser"
import { ComponentRegistry } from "isofw-shared/src/util/xpfwform"
import { ShotCamera } from "isofw-shared/src/xpfwDefs/project"
import WebCameraChoice from "isofw-web/src/components/project/programEditor/cameraChooser"

ComponentRegistry.registerComponent("string", WebCameraChoice, ShotCamera.theme)
cameraChooserTest()
