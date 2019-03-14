import * as path from "path"

const projectDirectories: {[index: string]: string}  = {
    ci: path.resolve(__dirname, `../../ci`),
    rn: path.resolve(__dirname, `../../isofwrn`),
    web: path.resolve(__dirname, `../../isofw-web`),
    ssr: path.resolve(__dirname, `../../isofw-node`),
    shared: path.resolve(__dirname, `../../isofw-shared`)
}

export default projectDirectories
