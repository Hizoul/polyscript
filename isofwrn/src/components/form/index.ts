import { ComponentRegistry } from "isofw-shared/src/util/xpfwformshared"
import { FieldType } from "isofw-shared/src/util/xpfwvalidate"
import BooleanField from "isofwrn/src/components/form/boolean"
import DateField from "isofwrn/src/components/form/date"
import ObjectField from "isofwrn/src/components/form/object"
import SelectField from "isofwrn/src/components/form/select"
import Slider from "isofwrn/src/components/form/slider"
import TextField from "isofwrn/src/components/form/text"

ComponentRegistry.registerComponent(FieldType.Text, TextField)
ComponentRegistry.registerComponent(FieldType.Number, TextField)
ComponentRegistry.registerComponent(FieldType.Date, DateField)
ComponentRegistry.registerComponent(FieldType.Password, TextField)
ComponentRegistry.registerComponent(FieldType.Slider, Slider)
ComponentRegistry.registerComponent(FieldType.Boolean, BooleanField)
ComponentRegistry.registerComponent(FieldType.Select, SelectField)
ComponentRegistry.registerComponent(FieldType.Object, ObjectField)
