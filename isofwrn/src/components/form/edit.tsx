import i18n from "isofw-shared/src/util/i18n"
import { dataOptions, IEditHookProps, useEditWithProps } from "isofw-shared/src/util/xpfwdata"
import { getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { colorError, colorSuccess } from "isofwrn/src/styles/color"
import margins from "isofwrn/src/styles/margins"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { Divider } from "react-native-elements"
import NativeButton from "../button"

const NativeEdit: React.FunctionComponent<IEditHookProps> = observer((props) => {
  const editProps = useEditWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(
      <SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = editProps.error != null
  const result = editProps.state
  let msg
  if (gotErr || result) {
    const textColor = {color: gotErr ? colorError : colorSuccess}
    msg = (
      <View>
        <Divider style={margins.topBot} />
        <View>
          <Text style={[textColor, {fontSize: 24}]}>
            {gotErr ? i18n.t("error") : i18n.t("success")}
          </Text>
          <Text style={textColor}>{gotErr ?
            i18n.t("inputError", JSON.stringify(editProps.error)) :
            i18n.t("saved", get(result, dataOptions.idPath))}
          </Text>
        </View>
      </View>
    )
  }
  return (
    <ScrollView>
      <ScrollView>
        {fields}
      </ScrollView>
      <NativeButton
        onPress={editProps.submitEdit}
        icon={{name: "save", type: "font-awesome", color: "white"}}
        title="save"
        loading={editProps.loading}
        containerStyle={margins.top}
      />
      {msg}
    </ScrollView>
  )
})

export default NativeEdit
