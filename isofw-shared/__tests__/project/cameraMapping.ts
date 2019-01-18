import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import cameraMappingTest from "isofw-shared/src/tests/project/cameraMapping"
import SharedCameraMapping from "isofw-shared/src/components/project/cameraMapping";
import { ComponentRegistry } from "@xpfw/form-shared";
import { FieldType } from "@xpfw/validate";
import { ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project";
ComponentRegistry.registerComponent(FieldType.Array, SharedCameraMapping(makeMockElement("DirectorEle")),ProjectOperatorCameraMapping.theme)
cameraMappingTest()
