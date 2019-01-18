import { registerComponents as registerWeb } from "@xpfw/form-web"
import { ComponentRegistry } from "@xpfw/form-shared"
import { FieldType } from "@xpfw/validate"
import BulmaArrayField from "isofw-web/src/components/form/array"
import ObjectField from "isofw-web/src/components/form/object"
import SearchField from "isofw-web/src/components/form/search"
import TextField from "isofw-web/src/components/form/text"
import MultiRelationship from "isofw-web/src/components/form/relationshipMulti"
import SingleRelationship from "isofw-web/src/components/form/relationshipSingle"
import CameraMapInField from "isofw-web/src/components/project/cameraMapping"
import BulmaBooleanField from "./boolean"

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
ComponentRegistry.registerComponent(FieldType.Array, CameraMapInField)
