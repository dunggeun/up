/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-console */
import 'setimmediate';
import 'react-native-reanimated';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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
