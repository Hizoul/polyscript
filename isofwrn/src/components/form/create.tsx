import i18n from "isofw-shared/src/util/i18n";
import { dataOptions, ICreateHookProps, useCreateWithProps } from "isofw-shared/src/util/xpfwdata"
import { getMapToFromProps, iterateSubFields, prependPrefix, SharedField } from "isofw-shared/src/util/xpfwform"
import { colorError, colorSuccess, errorBg, successBg } from "isofwrn/src/styles/color"
import { marginLeftRight, marginTop, marginTopBot } from "isofwrn/src/styles/margins"
import { get } from "lodash"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { ScrollView, Text, View } from "react-native"
import { Card, Divider } from "react-native-elements"
import NativeButton from "../button"

const NativeCreate: React.FunctionComponent<ICreateHookProps> = observer((props) => {
  const createProps = useCreateWithProps(props)
  const fields: any[] = []
  iterateSubFields(props.schema, (key, schema) => {
    fields.push(
      <SharedField key={key} schema={schema} prefix={prependPrefix(getMapToFromProps(props), props.prefix)} />)
  })
  const gotErr = createProps.error != null
  const result = createProps.state
  let msg: any
  if (gotErr || result) {
    const textColor = {color: gotErr ? colorError : colorSuccess}
    msg = (
      <View>
        <Divider style={marginTopBot} />
        <View>
          <Text style={[textColor, {fontSize: 24, textAlign: "center"}]}>
            {gotErr ? i18n.t("error") : i18n.t("success")}
          </Text>
          <Text style={textColor}>{gotErr ?
            i18n.t("inputError", JSON.stringify(createProps.error)) :
            i18n.t("created", get(result, dataOptions.idPath))}
          </Text>
        </View>
      </View>
    )
  }
  return (
    <View style={marginLeftRight}>
      <Card>
        <ScrollView>
          {fields}
        </ScrollView>
        <NativeButton
          onPress={createProps.submitCreate}
          icon={{name: "plus", type: "font-awesome"}}
          title="create"
          loading={createProps.loading}
          containerStyle={marginTop}
        />
        {msg}
      </Card>
    </View>
  )
})

export default NativeCreate
