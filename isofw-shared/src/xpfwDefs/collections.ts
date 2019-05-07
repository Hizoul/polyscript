import { BenchmarkResultForm } from "./benchmarkResult"
import { CameraForm } from "./camera"
import { PresetForm } from "./preset"
import { InstrumentForm, ProjectForm } from "./project"

const collections: any[] = [
  ProjectForm.collection, CameraForm.collection, PresetForm.collection, BenchmarkResultForm.collection, InstrumentForm.collection
]

export default collections
