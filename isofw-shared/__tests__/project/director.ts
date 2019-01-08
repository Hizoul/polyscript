import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"
import directorTest from "isofw-shared/src/tests/project/director"
import sharedDirectorComponent from "isofw-shared/src/components/project/directorSheet";

directorTest(sharedDirectorComponent(makeMockElement("DirectorEle")))
