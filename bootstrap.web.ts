/* eslint-disable no-console */
import 'setimmediate';
import 'react-native-reanimated';

Object.defineProperties(self, {
  _log: {
    value: console.log,
    configurable: false,
  },
  _warn: {
    value: console.warn,
    configurable: false,
  },
  _error: {
    value: console.error,
    configurable: false,
  },
});
