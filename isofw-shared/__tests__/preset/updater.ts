import usePresetUpdater from "isofw-shared/src/components/preset/updater"
import presetUpdaterTest from "isofw-shared/src/tests/preset/updater"
import makeMockElement from "isofw-shared/src/testUtil/makeMockElement"

presetUpdaterTest(makeMockElement("presetupdater", (props) => usePresetUpdater(props.id)))
