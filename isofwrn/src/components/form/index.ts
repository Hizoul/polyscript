import { ComponentRegistry } from "isofw-shared/src/util/xpfwformshared"
import { FieldType } from "isofw-shared/src/util/xpfwvalidate"
import { ProjectOperatorCameraMapping } from "isofw-shared/src/xpfwDefs/project"
import NativeArrayField from "isofwrn/src/components/form/array"
import BooleanField from "isofwrn/src/components/form/boolean"
import DateField from "isofwrn/src/components/form/date"
import ObjectField from "isofwrn/src/components/form/object"
import relationshipMulti from "isofwrn/src/components/form/relationshipMulti";
import relationshipSingle from "isofwrn/src/components/form/relationshipSingle";
import SearchTextField from "isofwrn/src/components/form/search"
import SelectField from "isofwrn/src/components/form/select"
import Slider from "isofwrn/src/components/form/slider"
import TextField from "isofwrn/src/components/form/text"
import NativeCameraMapping from "../project/cameraMapping";

ComponentRegistry.registerComponent(FieldType.Text, TextField)
ComponentRegistry.registerComponent(FieldType.Text, SearchTextField, "search")
ComponentRegistry.registerComponent(FieldType.Number, TextField)
ComponentRegistry.registerComponent(FieldType.Date, DateField)
ComponentRegistry.registerComponent(FieldType.Password, TextField)
ComponentRegistry.registerComponent(FieldType.Slider, Slider)
ComponentRegistry.registerComponent(FieldType.Boolean, BooleanField)
ComponentRegistry.registerComponent(FieldType.Select, SelectField)
ComponentRegistry.registerComponent(FieldType.Object, ObjectField)
ComponentRegistry.registerComponent(FieldType.RelationshipSingle, relationshipSingle)
ComponentRegistry.registerComponent(FieldType.RelationshipMulti, relationshipMulti)
ComponentRegistry.registerComponent(FieldType.Array, NativeArrayField)
ComponentRegistry.registerComponent(FieldType.Array, NativeCameraMapping, ProjectOperatorCameraMapping.theme)
