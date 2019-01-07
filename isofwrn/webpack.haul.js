import * as path from "path"

module.exports = ({ platform }, { module, resolve }) => ({
  entry: `./src/index.tsx`,
  module: {
    ...module,
    rules: [
      {
        test: /\.tsx?$/,
        use: [
         {loader: "babel-loader"},
         {loader: "ts-loader"} 
        ]
      },{
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: `file-loader`
      },
      ...module.rules
    ]
  },
  resolve: {
    ...resolve,
    extensions: [
      '.ts',
      '.tsx',
      `.${platform}.ts`,
      '.native.ts',
      `.${platform}.tsx`,
      '.native.tsx',
      ...resolve.extensions
    ],
    alias: {
      "isofw-web": __dirname,
      "isofw-shared": path.resolve(__dirname, `../isofw-shared`),
      "isofw-node": path.resolve(__dirname, `../isofw-node`),
      ...resolve.alias
    }
  }
});