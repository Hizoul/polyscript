import { useEdit } from "isofw-shared/src/util/xpfwdata"
import { FormStore, memo } from "isofw-shared/src/util/xpfwform"
import {
  OperatorRelation, ProjectCameras, ProjectForm,
  ProjectOperatorCameraMapping, ProjectOperators, ProjectProgram,
  ProjectShot, ShotCamera, ShotPreset
} from "isofw-shared/src/xpfwDefs/project"
import { find, get } from "lodash"

const currentOperatorKey = `current${ProjectOperators.title}`
const whichViewIsActiveKey = `operatorInView`
const isOperatorChooserVisibleKey = `operatorChooserVisible`

const memoKey = "operatorInfo"

const changeValue = (keyToUse: string, prefix?: string, toggleChooser?: boolean) => {
  return (operator: any) => {
    return () => {
      FormStore.setValue(keyToUse, operator, prefix)
      if (toggleChooser) {
        FormStore.setValue(isOperatorChooserVisibleKey, false, prefix)
      }
    }
  }
}

const useOperatorInfo = (id: string, mapTo?: string, prefix?: string, defItem?: any) => {
  const editHelper = useEdit(id, ProjectForm, mapTo, prefix)
  const currentOperator = FormStore.getValue(currentOperatorKey, prefix)
  const item = get(editHelper, "original", defItem)
  const mappings: any = find(get(item, String(ProjectOperatorCameraMapping.title), []),
    [OperatorRelation.title, currentOperator])
  const currentCameras = mappings && mappings[String(ProjectCameras.title)] ?
    mappings[String(ProjectCameras.title)] : []
  const program = get(item, String(ProjectProgram.title), [])
  let filteredList = program
  const presetByCameraObj: any = {}
  filteredList.forEach((subItem: any) => {
    if (subItem != null) {
      if (presetByCameraObj[subItem[String(ShotCamera.title)]] == null) {
        presetByCameraObj[subItem[String(ShotCamera.title)]] = []
      }
      presetByCameraObj[subItem[String(ShotCamera.title)]].push(subItem[String(ShotPreset.title)])
    }
  })
  const presetByCamera: any[] = []
  for (const k of Object.keys(presetByCameraObj)) {
    presetByCamera.push({
      camera: k, presets: presetByCameraObj[k]
    })
  }
  if (currentCameras.length > 0) {
    filteredList = filteredList.filter(
      (subItem: any) => currentCameras.indexOf(subItem[String(ShotCamera.title)]) !== -1)
  }
  const currentPreset = program[get(item, String(ProjectShot.title), 0)]
  const currentShot = get(item, String(ProjectShot.title))
  return {
    ...editHelper,
    currentOperator,
    currentPreset,
    currentCameras,
    currentShot,
    presetByCamera,
    filteredList,
    item,
    isPresetView: FormStore.getValue(whichViewIsActiveKey, prefix) === 1,
    isOperatorChooserVisible: FormStore.getValue(isOperatorChooserVisibleKey, prefix) === true,
    changeOperator: memo(() => changeValue(currentOperatorKey, prefix, true),
      [memoKey, currentOperatorKey, prefix, true]),
    useScriptView: memo(() => changeValue(whichViewIsActiveKey, prefix)(0), [memoKey, whichViewIsActiveKey, prefix, 0]),
    usePresetView: memo(() => changeValue(whichViewIsActiveKey, prefix)(1), [memoKey, whichViewIsActiveKey, prefix, 1]),
    showOperatorChooser: memo(() => changeValue(isOperatorChooserVisibleKey, prefix)(true),
      [memoKey, isOperatorChooserVisibleKey, prefix, true]),
    hideOperatorChooser: memo(() => changeValue(isOperatorChooserVisibleKey, prefix)(false),
      [memoKey, isOperatorChooserVisibleKey, prefix, false])
  }
}

export default useOperatorInfo
export {
  changeValue, currentOperatorKey, whichViewIsActiveKey
}
