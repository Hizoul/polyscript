import { ComponentRegistry } from "@xpfw/form"
import { registerComponents as registerWeb } from "@xpfw/form-web"
// import { ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"
import BulmaArrayField from "isofw-web/src/components/form/array"
import ObjectField from "isofw-web/src/components/form/object"
import MultiRelationship from "isofw-web/src/components/form/relationshipMulti"
import SingleRelationship from "isofw-web/src/components/form/relationshipSingle"
import SearchField from "isofw-web/src/components/form/search"
import SelectField from "isofw-web/src/components/form/select"
import TextField from "isofw-web/src/components/form/text"
// import CameraMapInField from "isofw-web/src/components/project/cameraMapping"

// const b: any = CameraMapInField

registerWeb()
ComponentRegistry.registerComponent("string", TextField)
// ComponentRegistry.registerComponent("string", SearchField, "search")
ComponentRegistry.registerComponent("number", TextField)
ComponentRegistry.registerComponent("string", SelectField, "select")
ComponentRegistry.registerComponent("array", BulmaArrayField)
ComponentRegistry.registerComponent("object", ObjectField)
ComponentRegistry.registerComponent("array", MultiRelationship, "multi")
ComponentRegistry.registerComponent("string", SingleRelationship, "single")
// ComponentRegistry.registerComponent(FieldType.Array, b, ProjectOperatorCameraMapping.theme)
