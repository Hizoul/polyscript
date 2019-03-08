import UDPClient from "isofw-node/src/network/udpClient"
import val from "isofw-shared/src/globals/val"
import networkTest from "isofw-shared/src/tests/network/base"

networkTest(val.network.udp, UDPClient)
