import * as CopyWebpackPlugin from "copy-webpack-plugin"
import * as ExtractTextPlugin from "extract-text-webpack-plugin"
import * as fs from "fs"
import * as path from "path"
import * as webpack from "webpack"

const nodeModules: any = {}
fs.readdirSync(path.resolve(__dirname, "../isofw-node/node_modules"))
.filter((x) => {
  return ".bin".indexOf(x) === -1
})
.forEach((mod: any) => {
  nodeModules[mod] = "commonjs " + mod
})
fs.readdirSync(path.resolve(__dirname, "../isofw-electron/node_modules"))
.filter((x) => {
  return ".bin".indexOf(x) === -1
})
.forEach((mod: any) => {
  nodeModules[mod] = "commonjs " + mod
})

const webpackServerConfig: webpack.Configuration = {
  target: "electron-main",
  externals: [nodeModules],
  entry: path.resolve(__dirname, "../isofw-electron/src/index.ts"),
  output: {
    filename: `isoelectron.js`,
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "../isofw-electron/dist/")
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "webpackDist/app", to: path.resolve(__dirname, `../isofw-electron/dist/app`)
    }]),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, `../isofw-electron/package.json`),
      to: path.resolve(__dirname, `../isofw-electron/dist/package.json`)
    }])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: `babel-loader`
          }
        ]
      }, {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: `file-loader`
      }, {
        test: /\.(scss|sass)$/i,
        use: ExtractTextPlugin.extract({
          fallback: `style-loader`,
          use: ["css-loader", "sass-loader"]
        })
      }, {
        test: /\.(css)$/i,
        use: ExtractTextPlugin.extract({
          fallback: `style-loader`,
          use: "css-loader"
        })
      }, {
        test: /\.tsx?$/,
        exclude: /.*(node_modules).*/,
        loader: "awesome-typescript-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "isofw-web": __dirname,
      "isofw-shared": path.resolve(__dirname, `../isofw-shared`),
      "isofw-rn": path.resolve(__dirname, `../isofw-rn`),
      "isofw-node": path.resolve(__dirname, `../isofw-node`),
      "isofw-electron": path.resolve(__dirname, `../isofw-electron`),
      "react": "preact-compat",
      "react-dom": "preact-compat"
    }
  }
}

export default webpackServerConfig
