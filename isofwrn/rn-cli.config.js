
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