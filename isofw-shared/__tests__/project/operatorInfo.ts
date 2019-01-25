import SharedOperatorInfo from "isofw-shared/src/components/project/operatorInfo"
import operatorInfoTest from "isofw-shared/src/tests/project/operatorInfo"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"

operatorInfoTest(SharedOperatorInfo(makeMockElement("operatorinfo")))
