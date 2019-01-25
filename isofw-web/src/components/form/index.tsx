import { ComponentRegistry } from "@xpfw/form-shared"
import { registerComponents as registerWeb } from "@xpfw/form-web"
import { FieldType } from "@xpfw/validate"
import { ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"
import BulmaArrayField from "isofw-web/src/components/form/array"
import ObjectField from "isofw-web/src/components/form/object"
import MultiRelationship from "isofw-web/src/components/form/relationshipMulti"
import SingleRelationship from "isofw-web/src/components/form/relationshipSingle"
import SearchField from "isofw-web/src/components/form/search"
import TextField from "isofw-web/src/components/form/text"
import CameraMapInField from "isofw-web/src/components/project/cameraMapping"

const b: any = CameraMapInField

registerWeb()
ComponentRegistry.registerComponent(FieldType.Text, TextField)
ComponentRegistry.registerComponent(FieldType.Text, SearchField, "search")
ComponentRegistry.registerComponent(FieldType.Password, TextField)
ComponentRegistry.registerComponent(FieldType.Number, TextField)
ComponentRegistry.registerComponent(FieldType.Date, TextField)
ComponentRegistry.registerComponent(FieldType.Array, BulmaArrayField)
ComponentRegistry.registerComponent(FieldType.Object, ObjectField)
ComponentRegistry.registerComponent(FieldType.RelationshipMulti, MultiRelationship)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, SingleRelationship)
ComponentRegistry.registerComponent(FieldType.Array, b, ProjectOperatorCameraMapping.theme)
