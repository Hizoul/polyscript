import { cp, exec, mkdir, mv, rm, sed } from "shelljs"
import pd from "./projectDirectories"

const urlFile = `${pd.shared}/src/globals/url.ts`
const valFile = `${pd.shared}/src/globals/val.ts`
const productionUrl = `my.prodserver.com`

const setGlobalsToProduction = (urlToUse: string, insecure?: boolean) => {
  sed(`-i`, `mainServer: \`.*\`'`, `mainServer: \`${urlToUse}\``, urlFile)
  sed(`-i`, `webPrefix: \`.*\``, `webPrefix: \`${insecure ? `http://` : `https://`}\``, urlFile)
  sed(`-i`, `wsPrefix: \`.*\``, `wsPrefix: \`${insecure ? `ws://` : `wss://`}\``, urlFile)
  sed(`-i`, `isDebug:.*`, `isDebug: false,`, valFile)
}

const buildWeb = () => {
  console.log(`BUILDING WEB`)
  exec(`npm run build || true`, {cwd: pd.web})
}

const buildNode = () => {
  console.log(`BUILDING NODE`)
  exec(`npm run buildSsr || true`, {cwd: pd.web})
}

const buildElectron = () => {
  console.log(`BUILDING ELECTRON`)
  exec(`npm run buildElectron || true`, {cwd: pd.web})
  rm(`-rf`, `${pd.electron}/dist/**/*.map`)
  exec(`npm run packageLinux || true`, {cwd: pd.electron})
  exec(`npm run packageMac || true`, {cwd: pd.electron})
  exec(`npm run packageWindows || true`, {cwd: pd.electron})
  exec(`npm run postPackage || true`, {cwd: pd.electron})
}

const buildRn = () => {
  console.log(`BUILDING RN`)
  exec(`npm run buildAndroid || true`, {cwd: pd.rn})
}

const buildAll = () => {
  buildWeb()
  buildNode()
  buildElectron()
  buildRn()
}

const packageArtifacts = () => {
  const toCompress = `${pd.ci}/build`
  mkdir(`-p`, `${toCompress}/electron`)
  mv(`${pd.ssr}/webpackDist`, `${toCompress}/server`)
  mv(`${pd.electron}/isofw-*`, `${toCompress}/electron`)
  cp(`${pd.rn}/android/app/build/outputs/apk/release/app-release.apk`, `${toCompress}`)
  cp(`${pd.rn}/android/app/build/outputs/apk/release/app-release.apk`,
    `${pd.ssr}/dist/isofw-web/webpackDist/release.apk`)
  exec(`7za a -mx2 ${pd.ci}/build.7z ${toCompress}/*`)
  rm(`-rf`, toCompress)
}

const cleanUpPreviousBuildArtifacts = () => {
  rm(`-rf`, `${pd.ci}/build.7z`)
  rm(`-rf`, `${pd.ci}/server`)
  rm(`-rf`, `${pd.ci}/electron`)
}

setGlobalsToProduction(productionUrl, false)
cleanUpPreviousBuildArtifacts()
buildAll()
packageArtifacts()
