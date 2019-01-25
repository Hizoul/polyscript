import sharedDirectorComponent from "isofw-shared/src/components/project/directorSheet"
import directorTest from "isofw-shared/src/tests/project/director"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"

directorTest(sharedDirectorComponent(makeMockElement("DirectorEle")))
