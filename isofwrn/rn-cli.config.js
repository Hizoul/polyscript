
var path = require('path')

function getRoots() {
  return [
    path.resolve(__dirname, '../isofw-shared')
  ];
}

module.exports = {
  watchFolders: getRoots(),
  transformer: {
    babelTransformerPath: require.resolve('react-native-typescript-transformer')
  },
  extraNodeModules: {
    "react-native": path.resolve(__dirname, "node_modules/react-native"),
    "react": path.resolve(__dirname, "node_modules/react"),
    "mobx": path.resolve(__dirname, "node_modules/mobx")
  },
  getSourceExts() {
    return ['ts', 'tsx'];
  },
  getProjectRoots() {
    return getRoots();
  },
  getAssetRoots() {
    return getRoots();
  }
}