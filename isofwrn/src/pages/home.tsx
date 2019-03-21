import val from "isofw-shared/src/globals/val"
import { useConnection } from "isofw-shared/src/network/benchmarkHook"
import NativeButton from "isofwrn/src/components/button"
import { MenuList } from "isofwrn/src/components/menu"
import NativePageContained from "isofwrn/src/components/pageContainer"
import doConnect from "isofwrn/src/network/backendConnection"
import { observer } from "mobx-react-lite"
import * as React from "react"
import { Text, View } from "react-native"
import { Input } from "react-native-elements"

if (!val.network.benchmarkEnabled) {
  doConnect()
}

const HomePage: React.FunctionComponent<any> = observer((props) => {
  console.debug("RENDERING HOME")
  const p = useConnection()
  return (
    <NativePageContained {...props} title="PolyScript" hideBack={true}>
    {(val.network.benchmarkEnabled && !p.connected) ? (
        <View>
          <Text>
            Benchmark Mode does not instantly connect to a Server.
            Please verify the IP and the Transport Mode and continue
          </Text>
          <Input
            label="IP-Address"
            value={p.ip}
            onChangeText={p.setIp}
          />
          <NativeButton
            title={`Used Network: ${p.networkToUse}`}
            onPress={p.toggleNetworkToUse}
          />
          <NativeButton
            title={`Use Compression: ${p.useCompression}`}
            onPress={p.toggleCompression}
          />
          <NativeButton
            title="connect"
            onPress={doConnect}
          />
        </View>
      ) : (
        <View>
          <Text>
            Welcome to PolyScript.
            What do you wish to do?
          </Text>
          <MenuList {...props} />
        </View>
      )}
    </NativePageContained>
  )
})

export default HomePage
