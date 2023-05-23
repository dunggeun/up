/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import 'node-self';
import * as RN from 'react-native';
import 'react-native-gesture-handler/jestSetup';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const self: any;

self.WEB_SENTRY_DSN = '';

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

// @ts-expect-error
RN.InteractionManager = {
  runAfterInteractions: jest.fn().mockImplementation((task: () => void) => {
    task();
  }),
};

// eslint-disable-next-line @typescript-eslint/no-empty-function
self.__reanimatedWorkletInit = (): void => {};
jest.mock('react-native-reanimated', () => ({
  ...require('react-native-reanimated/mock'),
  ZoomIn: {
    delay: jest.fn(),
  },
}));

jest.mock('react-native-share', () => ({
  default: jest.fn(),
}));

jest.mock('react-native-fs', () => ({
  default: {
    DownloadDirectoryPath: '',
    DocumentDirectoryPath: '',
    writeFile: jest.fn().mockImplementation(() => Promise.resolve()),
    readFile: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));

jest.mock('react-native-document-picker', () => ({
  default: {
    pickSingle: jest.fn().mockImplementation(() => Promise.resolve()),
  },
}));

jest.mock('react-native-push-notification', () => ({
  configure: jest.fn(),
  onRegister: jest.fn(),
  onNotification: jest.fn(),
  addEventListener: jest.fn(),
  requestPermissions: jest.fn(),
}));

jest.mock('@react-native-community/push-notification-ios', () => ({
  requestPermissions: jest.fn().mockReturnValue(
    Promise.resolve({
      alert: true,
      badge: true,
      sound: true,
    }),
  ),
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

jest.mock('react-native-haptic-feedback', () => ({
  trigger: jest.fn(),
  HapticFeedbackTypes: {},
}));

jest.mock('@sentry/react', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
  BrowserTracing: jest.fn(),
}));

jest.mock('@sentry/react-native', () => ({
  init: jest.fn(),
  captureException: jest.fn(),
}));

beforeAll(() => {
  // do something
});

afterAll(() => {
  // do something
});
