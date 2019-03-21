import { BlockTitle, Input, ListInput, List } from "framework7-react"
import val from "isofw-shared/src/globals/val"
import { useConnection } from "isofw-shared/src/network/benchmarkHook"
import doConnection from "isofw-web/src/backendConnection"
import WebButton from "isofw-web/src/components/button"
import { MenuEntries } from "isofw-web/src/components/menuPanel"
import WebPageContainer from "isofw-web/src/components/pageContainer"
import { observer } from "mobx-react-lite"
import * as React from "react"

if (!val.network.benchmarkEnabled) {
  doConnection()
}

const Home: React.FunctionComponent<any> = observer((props) => {
  const p = useConnection()
  return (
    <WebPageContainer {...props} name="home" title="PolyScript">
      {(val.network.benchmarkEnabled && !p.connected) ? (
        <div>
          <BlockTitle>
            Benchmark Mode does not instantly connect to a Server.
            Please verify the IP and the Transport Mode and continue
          </BlockTitle>
          <List>
            <ListInput
              label="IP-Address"
              value={p.ip}
              onChange={(e) => {
                p.setIp(e.nativeEvent.target.value)
              }}
            />
          </List>
          <WebButton
            text={`Used Network: ${p.networkToUse}`}
            onClick={p.toggleNetworkToUse}
          />
          <WebButton
            text={`Use Compression: ${p.useCompression}`}
            onClick={p.toggleCompression}
          />
          <WebButton
            text="connect"
            onClick={doConnection}
          />
        </div>
      ) : (
        <div>
          <BlockTitle>
            welcome to PolyScript.<br />
            what do you wish to do?
          </BlockTitle>
          <MenuEntries />
        </div>
        )
      }
    </WebPageContainer>
  )
})

export default Home
