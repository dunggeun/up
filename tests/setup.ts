/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */

import 'node-self';
import * as RN from 'react-native';
import 'react-native-gesture-handler/jestSetup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const self: any;

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

const DummyComponent = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode => children;

// @ts-expect-error
RN.Animated.timing = (): RN.Animated.timing => ({
  start: (callback?: () => void): void => {
    callback?.();
  },
});

// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unsafe-member-access
self.__reanimatedWorkletInit = (): void => {};
jest.mock('react-native-reanimated', () =>
  require('react-native-reanimated/mock'),
);

jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));

jest.mock('react-native-webview', () => ({
  default: DummyComponent,
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-navigation/core', () => ({
  ...jest.requireActual('@react-navigation/core'),
  useFocusEffect: jest.fn(),
}));

jest.mock('react-native-safe-area-context', () => ({
  ...jest.requireActual('react-native-safe-area-context'),
  SafeAreaProvider: DummyComponent,
  SafeAreaView: DummyComponent,
  useSafeAreaInsets: jest.fn().mockReturnValue({
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
  }),
}));

jest.mock('react-native-localize', () => ({
  __esModule: true,
  getLocales: (): { languageCode: string }[] => [{ languageCode: 'en' }],
}));

beforeAll(() => {
  // do something
});

afterAll(() => {
  // do something
});
