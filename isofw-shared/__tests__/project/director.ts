import useDirectorComponent from "isofw-shared/src/components/project/directorSheet"
import directorTest from "isofw-shared/src/tests/project/director"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"

directorTest(makeMockElement("DirectorEle", (props) => useDirectorComponent(props.id, props.reset)))
