// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import 'node-self';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';

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
