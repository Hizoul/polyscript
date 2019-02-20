import { ComponentRegistry } from "@xpfw/form"
import useCameraMapping from "isofw-shared/src/components/project/cameraMapping"
import cameraMappingTest from "isofw-shared/src/tests/project/cameraMapping"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import { ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"

ComponentRegistry.registerComponent("array",
  makeMockElement("DirectorEle", (props) => useCameraMapping(props.schema, props.mapTo, props.prefix)),
  ProjectOperatorCameraMapping.theme)
cameraMappingTest()
