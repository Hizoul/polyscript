import TCPClient from "isofw-node/src/network/tcpClient"
import val from "isofw-shared/src/globals/val"
import networkTest from "isofw-shared/src/tests/network/base"

networkTest(val.network.tcp, TCPClient)