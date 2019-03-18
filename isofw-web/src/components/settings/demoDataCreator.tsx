import { Card, CardContent, CardFooter, CardHeader, Progressbar } from "framework7-react"
import { useDemoData } from "isofw-shared/src/util/createDemoData"
import i18n from "isofw-shared/src/util/i18n"
import WebButton from "isofw-web/src/components/button"
import { observer } from "mobx-react-lite"
import * as React from "react"

const DemoDataCreator: React.FunctionComponent<any> = observer((props) => {
  const demoHelper = useDemoData()
  return (
    <Card>
      <CardHeader>{i18n.t("demoDataHeader")}</CardHeader>
      <CardContent>
        <div className="text-align-center">{i18n.t("demoDataProgress", [demoHelper.progress, demoHelper.total])}</div>
        <Progressbar progress={Math.round(demoHelper.progress / demoHelper.total) * 100} />
      </CardContent>
      <CardFooter>
        <WebButton
          text="create"
          iconFa="plus"
          onClick={demoHelper.createData}
        />
        <WebButton
          text="remove"
          iconFa="trash"
          onClick={demoHelper.removeDemoData}
        />
      </CardFooter>
    </Card>
  )
})

export default DemoDataCreator
