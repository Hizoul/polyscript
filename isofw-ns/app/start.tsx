import { ActionBar, Button, Label, Page, ScrollView, StackLayout, Progress } from "preact-nativescript-components"
import { navigateTo } from "preact-to-nativescript"
import * as React from "react"
import SharedComp from "isofw-shared/src/comp"


const StartPage: any = () => {
  return (
    <Page>
        <ActionBar text="isofw" />
        <ScrollView>
          <StackLayout>
            <Button text="isofwbtn" />
            <SharedComp view={Button} />
            <Progress value={50} />
          </StackLayout>
        </ScrollView>
    </Page>
  )
}

export default StartPage
