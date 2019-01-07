import { exec } from "shelljs"
import pd from "./projectDirectories"

const upgradeDependenciesInDirectory = (dir: string) => {
  const execOptions = {cwd: dir}
  exec(`${pd.ci}/node_modules/.bin/ncu -a --packageFile ${dir}/package.json`, execOptions)
  exec(`yarn`, execOptions)
}

for (const key in pd) {
  if (pd[key] !== pd.ci) {
    upgradeDependenciesInDirectory(pd[key])
  }
}
upgradeDependenciesInDirectory(pd.ci)
