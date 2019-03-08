import TCPClient from "isofw-node/src/network/tcpClient"
import val from "isofw-shared/src/globals/val"
import networkTest from "isofw-shared/src/tests/network/base"
import makeBenchmarkClient from "isofw-shared/src/network/clientBenchmarker"

networkTest(val.network.tcp, makeBenchmarkClient(TCPClient))
