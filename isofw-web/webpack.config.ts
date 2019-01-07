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

export default webpackConfig
