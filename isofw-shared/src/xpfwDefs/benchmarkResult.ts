import { ExtendedJSONSchema } from "@xpfw/form"
import val from "isofw-shared/src/globals/val"
import { changeValToRegex } from "isofw-shared/src/util/valToRegex"
import { ProjectName } from "./project"

const NetworkTypeField: ExtendedJSONSchema = {
  type: "number",
  title: "type"
}
const ClientProcessTimeField: ExtendedJSONSchema = {
  type: "number",
  title: "time"
}
const MethodField: ExtendedJSONSchema = {
  type: "string",
  title: "method"
}
const CollectionType: ExtendedJSONSchema = {
  type: "string",
  title: "collection"
}

const ClientSentField: ExtendedJSONSchema = {
  type: "number",
  title: "clientSent"
}
const ClientArriveField: ExtendedJSONSchema = {
  type: "number",
  title: "clientArrive"
}

const ServerArriveType: ExtendedJSONSchema = {
  type: "number",
  title: "serverArrive"
}
const ServerSentTypeField: ExtendedJSONSchema = {
  type: "number",
  title: "serverSent"
}
const ServerProcessTimeField: ExtendedJSONSchema = {
  type: "number",
  title: "serverProcessTime"
}

const BenchmarkResultForm: ExtendedJSONSchema = {
  title: "benchmarkResult",
  collection: val.service.benchmarkResults,
  type: "object",
  properties: {
    [String(NetworkTypeField.title)]: NetworkTypeField,
    [String(ClientProcessTimeField.title)]: ClientProcessTimeField,
    [String(MethodField.title)]: MethodField,
    [String(CollectionType.title)]: CollectionType,
    [String(ClientSentField.title)]: ClientSentField,
    [String(ClientArriveField.title)]: ClientArriveField,
    [String(ServerArriveType.title)]: ServerArriveType,
    [String(ServerSentTypeField.title)]: ServerSentTypeField,
    [String(ServerProcessTimeField.title)]: ServerProcessTimeField
  },
  modify: {
    addCreatedAt: true
  }
}

export {
  BenchmarkResultForm, NetworkTypeField, ClientProcessTimeField, MethodField,
  CollectionType, ClientSentField, ClientArriveField, ServerArriveType, ServerSentTypeField,
  ServerProcessTimeField
}
