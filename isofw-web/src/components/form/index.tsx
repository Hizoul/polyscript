import { ComponentRegistry } from "@xpfw/form"
import { registerComponents as registerWeb } from "@xpfw/form-web"
import { ProjectOperatorCameraMapping, ShotPreset } from "isofw-shared/src/xpfwDefs/project"
import BulmaArrayField from "isofw-web/src/components/form/array"
import BooleanField from "isofw-web/src/components/form/boolean"
import ObjectField from "isofw-web/src/components/form/object"
import MultiRelationship from "isofw-web/src/components/form/relationshipMulti"
import SingleRelationship from "isofw-web/src/components/form/relationshipSingle"
import SearchField from "isofw-web/src/components/form/search"
import SelectField from "isofw-web/src/components/form/select"
import TextField from "isofw-web/src/components/form/text"
import CameraMapInField from "isofw-web/src/components/project/cameraMapping"
import ProgramSingleRelationship from "isofw-web/src/components/project/programEditor/programSingleRelationship"
import ProgramArray from "../project/programEditor/array"
import CameraChooser from "../project/programEditor/cameraChooser"
import presetNumberDisplay from "../project/programEditor/presetNumberDisplay"

const programTheme = "program"
registerWeb()
ComponentRegistry.registerComponent("boolean", BooleanField)
ComponentRegistry.registerComponent("string", TextField)
ComponentRegistry.registerComponent("string", SearchField, "search")
ComponentRegistry.registerComponent("number", TextField)
ComponentRegistry.registerComponent("string", SelectField, "select")
ComponentRegistry.registerComponent("array", BulmaArrayField)
ComponentRegistry.registerComponent("object", ObjectField)
ComponentRegistry.registerComponent("array", MultiRelationship, "multi")
ComponentRegistry.registerComponent("string", SingleRelationship, "single")
ComponentRegistry.registerComponent("array", CameraMapInField, ProjectOperatorCameraMapping.theme)
ComponentRegistry.registerComponent("array", ProgramArray, programTheme)
ComponentRegistry.registerComponent("string", CameraChooser, programTheme)
ComponentRegistry.registerComponent("string", ProgramSingleRelationship, "instrument")
ComponentRegistry.registerComponent("string", presetNumberDisplay, ShotPreset.theme)
