import { ComponentRegistry } from "isofw-shared/src/util/xpfwform"
import { ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"
import NativeArrayField from "isofwrn/src/components/form/array"
import BooleanField from "isofwrn/src/components/form/boolean"
import ObjectField from "isofwrn/src/components/form/object"
import relationshipMulti from "isofwrn/src/components/form/relationshipMulti"
import relationshipSingle from "isofwrn/src/components/form/relationshipSingle"
import SearchTextField from "isofwrn/src/components/form/search"
import SelectField from "isofwrn/src/components/form/select"
import TextField from "isofwrn/src/components/form/text"
import NativeCameraMapping from "../project/cameraMapping"

ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("string", SearchTextField, "search")
ComponentRegistry.registerComponent("number", TextField)
ComponentRegistry.registerComponent("boolean", BooleanField)
ComponentRegistry.registerComponent("string", SelectField, "select")
ComponentRegistry.registerComponent("object", ObjectField)
ComponentRegistry.registerComponent("string", relationshipSingle, "single")
ComponentRegistry.registerComponent("array", relationshipMulti, "multi")
ComponentRegistry.registerComponent("array", NativeArrayField)
ComponentRegistry.registerComponent("array", NativeCameraMapping, ProjectOperatorCameraMapping.theme)
