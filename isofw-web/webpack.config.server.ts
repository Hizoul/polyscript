import * as CopyWebpackPlugin from "copy-webpack-plugin"
import * as fs from "fs"
import * as MiniCssExtractPlugin from "mini-css-extract-plugin"
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

const webpackServerConfig: webpack.Configuration = {
  target: "node" as "node",
  mode: "development",
  externals: [nodeModules],
  entry: path.resolve(__dirname, "../isofw-node/src/index.ts"),
  output: {
    filename: `isoapp.js`,
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "../isofw-node/webpackDist/")
  },
  plugins: [
    new CopyWebpackPlugin([{
      from: "webpackDist/app", to: path.resolve(__dirname, `../isofw-node/webpackDist/app`)
    }]),
    new MiniCssExtractPlugin({filename: "app/isofwwebstyles.css"})
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
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }, {
        test: /\.(css)$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"]
      }, {
        test: /\.tsx?$/,
        exclude: /.*(node_modules).*/,
        loader: "ts-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "isofw-web": __dirname,
      "isofw-shared": path.resolve(__dirname, `../isofw-shared`),
      "isofw-rn": path.resolve(__dirname, `../isofw-rn`),
      "isofw-node": path.resolve(__dirname, `../isofw-node`)
    }
  }
}

export default webpackServerConfig
