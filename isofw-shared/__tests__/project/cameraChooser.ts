import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import cameraChooserTest from "isofw-shared/src/tests/project/cameraChooser"
import SharedCameraChoice from "isofw-shared/src/components/project/cameraChooser";
import { ComponentRegistry } from "@xpfw/form-shared";
import { FieldType } from "@xpfw/validate";
import { ShotCamera } from "isofw-shared/src/xpfwDefs/project"

ComponentRegistry.registerComponent(FieldType.RelationshipSingle, SharedCameraChoice(makeMockElement("DirectorEle")), ShotCamera.theme)
cameraChooserTest()
