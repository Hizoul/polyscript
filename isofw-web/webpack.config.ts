import * as path from "path"
import * as webpack from "webpack"

const webpackConfig: webpack.Configuration = {
  entry: `./src/index.tsx`,
  mode: "development",
  output: {
    filename: `isoapp.js`,
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "webpackDist/app")
  },
  plugins: [
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
        use: [
          {
            loader: `style-loader`
          }, {
            loader: `css-loader`
          }, {
            loader: `sass-loader`
          }
        ]
      }, {
        test: /\.(css)$/i,
        use: [
          {
            loader: `style-loader`
          }, {
            loader: `css-loader`
          }
        ]
      }, {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      { test: /\.(woff|woff2|eot|ttf)$/, loader: "url-loader?limit=100000" }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "isofw-web": __dirname,
      "isofw-shared": path.resolve(__dirname, `../isofw-shared`),
      "isofwrn": path.resolve(__dirname, `../isofwrn`),
      "isofw-node": path.resolve(__dirname, `../isofw-node`),
      "mobx":  path.resolve(__dirname, `./node_modules/mobx`),
      "react":  path.resolve(__dirname, `./node_modules/react`),
      "@xpfw/form": path.resolve(__dirname, `./node_modules/@xpfw/form`),
      "@xpfw/form-web": path.resolve(__dirname, `./node_modules/@xpfw/form-web`),
      "@xpfw/data": path.resolve(__dirname, `./node_modules/@xpfw/data`),
      "@xpfw/dm-shared": path.resolve(__dirname, `./node_modules/@xpfw/dm-shared`),
      "@xpfw/dm": path.resolve(__dirname, `./node_modules/@xpfw/dm`)
    }
  },
  node: {
    dgram: "empty",
    net: "empty"
  }
}

export default webpackConfig
