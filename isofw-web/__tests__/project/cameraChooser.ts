import cameraChooserTest from "isofw-shared/src/tests/project/cameraChooser"
import WebCameraChoice from "isofw-web/src/components/project/programEditor/cameraChooser";
import { ComponentRegistry } from "@xpfw/form-shared";
import { FieldType } from "@xpfw/validate";
import { ShotCamera } from "isofw-shared/src/xpfwDefs/project"

ComponentRegistry.registerComponent(FieldType.RelationshipSingle, WebCameraChoice, ShotCamera.theme)
cameraChooserTest()
