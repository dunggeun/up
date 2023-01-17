module.exports = {
  projects: {
    ios: {},
    android: {},
  },
  dependencies: {
    // https://github.com/react-native-community/cli/blob/0e63e750a235062cd9bc43ed6a4a2beb8f14385a/docs/autolinking.md#how-can-i-disable-autolinking-for-new-architecture-fabric-turbomodules
    '@react-native-community/datetimepicker': {
      platforms: {
        android: {
          libraryName: null,
          componentDescriptors: null,
          androidMkPath: null,
          cmakeListsPath: null,
        },
      },
    },
    'react-native-haptic-feedback': {
      platforms: {
        android: null,
      },
    },
    'react-native-sqlite-storage': {
      platforms: {
        android: {
          sourceDir:
            '../node_modules/react-native-sqlite-storage/platforms/android-native',
          packageImportPath: 'import org.pgsqlite.SQLitePluginPackage;',
          packageInstance: 'new SQLitePluginPackage()'
        },
      },
    },
  },
  assets:['./assets/fonts/'],
};
