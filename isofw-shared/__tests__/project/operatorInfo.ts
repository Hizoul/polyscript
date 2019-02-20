import operatorInfoTest from "isofw-shared/src/tests/project/operatorInfo"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import useOperatorInfo from "isofw-shared/src/components/project/operatorInfo";

operatorInfoTest(makeMockElement("operatorinfo",
  (props) => useOperatorInfo(props.id, props.mapTo, props.prefix, props.reset)))
