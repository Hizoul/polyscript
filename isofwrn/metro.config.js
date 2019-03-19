/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

var path = require('path')

function getRoots() {
  return [
    path.resolve(__dirname, '../isofw-shared')
  ];
}
module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
        babelTransformerPath: require.resolve('react-native-typescript-transformer')
      },
    }),
  },
  watchFolders: getRoots(),
  getSourceExts() {
    return ['ts', 'tsx'];
  },
  getProjectRoots() {
    return getRoots();
  },
  getAssetRoots() {
    return getRoots();
  },
  extraNodeModules: {
    "react-native": path.resolve(__dirname, "node_modules/react-native"),
    "react": path.resolve(__dirname, "node_modules/react"),
    "mobx": path.resolve(__dirname, "node_modules/mobx"),
    "net": path.resolve(__dirname, "node_modules/@hawkingnetwork/react-native-tcp"),
    "tls": path.resolve(__dirname, "node_modules/@hawkingnetwork/react-native-tcp/tls"),
    "dgram": path.resolve(__dirname, "node_modules/react-native-udp")
  }
};
