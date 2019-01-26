import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "@xpfw/validate"
import SharedCameraMapping from "isofw-shared/src/components/project/cameraMapping"
import cameraMappingTest from "isofw-shared/src/tests/project/cameraMapping"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import { ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"

ComponentRegistry.registerComponent(FieldType.Array,
  SharedCameraMapping(makeMockElement("DirectorEle")), ProjectOperatorCameraMapping.theme)
cameraMappingTest()