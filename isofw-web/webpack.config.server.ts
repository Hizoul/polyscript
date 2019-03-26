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
      from: "../isofw-node/package.json", to: path.resolve(__dirname, `../isofw-node/webpackDist/package.json`)
    }]),
    new CopyWebpackPlugin([{
      from: "webpackDist/app", to: path.resolve(__dirname, `../isofw-node/webpackDist/app`)
    }]),
    new MiniCssExtractPlugin({filename: "app/isofwwebstyles.css"})
  ],
  module: {
    rules: [
      {
        test: /\.worker\.ts$/,
        use: { loader: "worker-loader" }
      },
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
      "isofw-node": path.resolve(__dirname, `../isofw-node`),
      "react":  path.resolve(__dirname, `./node_modules/react`),
      "resub":  path.resolve(__dirname, `./node_modules/resub`),
      "resub-persist":  path.resolve(__dirname, `./node_modules/resub-persist`),
      "@xpfw/validate": path.resolve(__dirname, `./node_modules/@xpfw/validate`),
      "@xpfw/form-shared": path.resolve(__dirname, `./node_modules/@xpfw/form-shared`),
      "@xpfw/form-web": path.resolve(__dirname, `./node_modules/@xpfw/form-web`),
      "@xpfw/form-bulma": path.resolve(__dirname, `./node_modules/@xpfw/form-bulma`),
      "@xpfw/ui-bulma": path.resolve(__dirname, `./node_modules/@xpfw/ui-bulma`),
      "@xpfw/ui-shared": path.resolve(__dirname, `./node_modules/@xpfw/ui-shared`),
      "@xpfw/dm-shared": path.resolve(__dirname, `./node_modules/@xpfw/dm-shared`),
      "@xpfw/dm": path.resolve(__dirname, `./node_modules/@xpfw/dm`)
    }
  }
}

export default webpackServerConfig
